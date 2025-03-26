import React from 'react';
import config from '../../../../config.json';
import { FlexBox, Icon, Option, Select, Title } from '@ui5/webcomponents-react';
import {
  RedisSize,
  redisState,
} from '../../../../state/additionalConfig/redisState';
import { useSetRecoilState } from 'recoil';
import './RedisSelect.css';
import openLinks from '../../Functions/openLinks';

export default function RedisSelect() {
  const redisConfigOptions = config.RedisCosts.Tiers;
  const setVmSize = useSetRecoilState<RedisSize>(redisState);

  const onChange = (event: any) => {
    const selection = event.detail.selectedOption.dataset;
    setVmSize({
      value: +selection.value,
      tsize: selection.key,
    });
  };

  return (
    <>
      <FlexBox
        wrap="NoWrap"
        alignItems="Center"
        fitContainer
        displayInline
        justifyContent="Start"
      >
        <Title className="wizard-subheader" level="H5" size="H5">
          Cloud-managed Redis cache
        </Title>
        <Icon
          className="help-portal-link"
          design="Information"
          mode="Interactive"
          name="sys-help"
          onClick={() => openLinks('redis')}
        />
      </FlexBox>
      <Select className="redis-select" onChange={onChange}>
        {redisConfigOptions.map((item) => (
          <Option key={item.key} data-key={item.key} data-value={item.value}>
            {item.key}
          </Option>
        ))}
      </Select>
    </>
  );
}
