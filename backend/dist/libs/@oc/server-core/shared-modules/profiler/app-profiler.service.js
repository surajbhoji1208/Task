"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a, _ProfilerService_logger;
var ProfilerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilerService = void 0;
const common_1 = require("@nestjs/common");
const node_async_hooks_1 = require("node:async_hooks");
let ProfilerService = ProfilerService_1 = _a = class ProfilerService {
    constructor() {
        _ProfilerService_logger.set(this, new common_1.Logger(ProfilerService_1.name));
        this.profiles = new Map();
        this.MAX_HISTORY = 100;
        this.storage = new node_async_hooks_1.AsyncLocalStorage();
    }
    runWithContext(fn) {
        return this.storage.run({ cacheHits: 0, cacheMisses: 0 }, fn);
    }
    enterWithContext() {
        this.storage.enterWith({ cacheHits: 0, cacheMisses: 0 });
    }
    recordCacheHit() {
        const store = this.storage.getStore();
        if (store) {
            store.cacheHits++;
            __classPrivateFieldGet(this, _ProfilerService_logger, "f").debug(`Context found: incremented cacheHits to ${store.cacheHits}`);
        }
        else {
            __classPrivateFieldGet(this, _ProfilerService_logger, "f").warn('Context NOT found during recordCacheHit');
        }
    }
    recordCacheMiss() {
        const store = this.storage.getStore();
        if (store) {
            store.cacheMisses++;
            __classPrivateFieldGet(this, _ProfilerService_logger, "f").debug(`Context found: incremented cacheMisses to ${store.cacheMisses}`);
        }
        else {
            __classPrivateFieldGet(this, _ProfilerService_logger, "f").warn('Context NOT found during recordCacheMiss');
        }
    }
    recordProfile(endpoint, method, path, responseTime, isError = false, cacheHits = 0, cacheMisses = 0) {
        const safeHits = cacheHits || 0;
        const safeMisses = cacheMisses || 0;
        let profile = this.profiles.get(endpoint);
        if (!profile) {
            profile = {
                endpoint,
                method,
                path,
                totalCalls: 0,
                totalResponseTime: 0,
                averageResponseTime: 0,
                p95ResponseTime: 0,
                minResponseTime: responseTime,
                maxResponseTime: responseTime,
                lastCallAt: new Date(),
                errorCount: 0,
                cacheHitCount: 0,
                cacheMissCount: 0,
                recentLatencies: []
            };
            this.profiles.set(endpoint, profile);
        }
        profile.totalCalls++;
        profile.totalResponseTime += responseTime;
        profile.averageResponseTime = profile.totalResponseTime / profile.totalCalls;
        profile.minResponseTime = Math.min(profile.minResponseTime, responseTime);
        profile.maxResponseTime = Math.max(profile.maxResponseTime, responseTime);
        profile.lastCallAt = new Date();
        profile.cacheHitCount += safeHits;
        profile.cacheMissCount += safeMisses;
        __classPrivateFieldGet(this, _ProfilerService_logger, "f").debug(`[ProfilerV3] Recorded ${endpoint}: hits=${safeHits}, misses=${safeMisses}, totalHits=${profile.cacheHitCount}`);
        if (isError) {
            profile.errorCount++;
        }
        if (profile.recentLatencies) {
            profile.recentLatencies.push(responseTime);
            if (profile.recentLatencies.length > this.MAX_HISTORY) {
                profile.recentLatencies.shift();
            }
            const sorted = [...profile.recentLatencies].sort((a, b) => a - b);
            const index = Math.floor(sorted.length * 0.95);
            profile.p95ResponseTime = sorted[index] || responseTime;
        }
        if (responseTime > 1000) {
            __classPrivateFieldGet(this, _ProfilerService_logger, "f").warn(`Slow API call: ${endpoint} took ${responseTime}ms`);
        }
    }
    getAllProfiles() {
        return Array.from(this.profiles.values())
            .map(p => {
            const { recentLatencies } = p, rest = __rest(p, ["recentLatencies"]);
            return rest;
        })
            .sort((a, b) => b.averageResponseTime - a.averageResponseTime);
    }
    getProfile(endpoint) {
        const profile = this.profiles.get(endpoint);
        if (!profile)
            return undefined;
        const { recentLatencies } = profile, rest = __rest(profile, ["recentLatencies"]);
        return rest;
    }
    getSummary() {
        const allProfiles = Array.from(this.profiles.values());
        if (allProfiles.length === 0) {
            return {
                totalEndpoints: 0,
                totalCalls: 0,
                totalCacheHits: 0,
                totalCacheMisses: 0,
                averageResponseTime: 0,
                slowestEndpoint: null,
                fastestEndpoint: null
            };
        }
        let totalCalls = 0;
        let totalWeightedTime = 0;
        let totalCacheHits = 0;
        let totalCacheMisses = 0;
        let slowest = allProfiles[0];
        let fastest = allProfiles[0];
        for (const p of allProfiles) {
            totalCalls += p.totalCalls;
            totalWeightedTime += p.totalResponseTime;
            totalCacheHits += p.cacheHitCount;
            totalCacheMisses += p.cacheMissCount;
            if (p.averageResponseTime > slowest.averageResponseTime)
                slowest = p;
            if (p.averageResponseTime < fastest.averageResponseTime)
                fastest = p;
        }
        const { recentLatencies: sL } = slowest, slowestRest = __rest(slowest, ["recentLatencies"]);
        const { recentLatencies: fL } = fastest, fastestRest = __rest(fastest, ["recentLatencies"]);
        return {
            totalEndpoints: allProfiles.length,
            totalCalls,
            totalCacheHits,
            totalCacheMisses,
            averageResponseTime: totalCalls > 0 ? Math.round((totalWeightedTime / totalCalls) * 100) / 100 : 0,
            slowestEndpoint: slowestRest,
            fastestEndpoint: fastestRest
        };
    }
    clearAllProfiles() {
        this.profiles.clear();
        __classPrivateFieldGet(this, _ProfilerService_logger, "f").log('All profiler data cleared');
    }
    getContext() {
        return this.storage.getStore();
    }
    getHighErrorRateEndpoints() {
        return this.getAllProfiles().filter(profile => {
            const errorRate = profile.errorCount / profile.totalCalls;
            return errorRate > 0.05 && profile.totalCalls > 10;
        });
    }
    getSlowEndpoints() {
        return this.getAllProfiles().filter(profile => profile.averageResponseTime > 500);
    }
};
exports.ProfilerService = ProfilerService;
_ProfilerService_logger = new WeakMap();
exports.ProfilerService = ProfilerService = ProfilerService_1 = __decorate([
    (0, common_1.Injectable)()
], ProfilerService);
//# sourceMappingURL=app-profiler.service.js.map