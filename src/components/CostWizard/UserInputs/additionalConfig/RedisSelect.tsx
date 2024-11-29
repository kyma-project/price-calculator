import React from 'react';
import config from '../../../../config.json';
import { Option, Select, Title } from '@ui5/webcomponents-react';
import { RedisSize, redisState } from '../../../../state/additionalConfig/redisState';
import { useSetRecoilState } from 'recoil';

export default function RedisSelect() {
  const redisConfigOptions = config.RedisCosts.Tiers;
  const setVmSize = useSetRecoilState<RedisSize>(redisState);

  const onChange = (event: any) => {
    const selection = event.detail.selectedOption.dataset;
    setVmSize({
      value: +selection.value,
      tsize: selection.key
    });
  };

  return (
    <>
      <Title className="wizard-subheader" level="H5">
        Cloud-managed Redis cache
      </Title>
      <Select onChange={onChange}>
        {redisConfigOptions.map((item) => (
          <Option
            key={item.key}
            data-key={item.key}
            data-value={item.value}
          >
            {item.key}
          </Option>
        ))}
      </Select>
    </>
  );
}
