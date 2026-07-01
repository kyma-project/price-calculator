import { atom } from 'jotai';
import config from '../../config.json';

export interface RedisSize {
  tier: string;
  storageGib: number;
}

export const redisState = atom<RedisSize>({
  tier: config.RedisCosts.Tiers[0].key,
  storageGib: config.RedisCosts.Tiers[0].storageGib,
});
redisState.debugLabel = 'redisState';
