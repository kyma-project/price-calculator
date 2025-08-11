import { atom } from 'jotai';
import config from '../../config.json';

export interface RedisSize {
  tsize: string;
  value: number;
}

export const redisState = atom<RedisSize>({
  tsize: config.RedisCosts.Tiers[0].key,
  value: config.RedisCosts.Tiers[0].value,
});
redisState.debugLabel = 'redisState';
