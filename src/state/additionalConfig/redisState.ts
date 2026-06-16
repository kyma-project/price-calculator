import { atom } from 'jotai';
import config from '../../config.json';

export interface RedisSize {
  tier: string;
  storageGb: number;
}

export const redisState = atom<RedisSize>({
  tier: config.RedisCosts.Tiers[0].key,
  storageGb: config.RedisCosts.Tiers[0].storageGb,
});
redisState.debugLabel = 'redisState';
