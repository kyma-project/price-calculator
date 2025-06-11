import { atom, RecoilState } from 'recoil';
import config from '../../config.json';

export interface RedisSize {
  tsize: string;
  value: number;
}

export const redisState: RecoilState<RedisSize> = atom<RedisSize>({
  key: 'redisState',
  default: {
    tsize: config.RedisCosts.Tiers[0].key,
    value: config.RedisCosts.Tiers[0].value,
  },
});
