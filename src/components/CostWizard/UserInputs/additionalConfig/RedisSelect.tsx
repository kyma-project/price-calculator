import { useSetAtom } from 'jotai';
import config from '../../../../config.json';
import { FlexBox, Icon, Option, Select, Title } from '@ui5/webcomponents-react';
import { redisState } from '../../../../state/additionalConfig/redisState';
import './RedisSelect.css';
import openLinks from '../../Functions/openLinks';

export default function RedisSelect() {
  const redisConfigOptions = config.RedisCosts.Tiers;
  const setRedisSize = useSetAtom(redisState);

  const onChange = (event: {
    detail: { selectedOption: { dataset: DOMStringMap } };
  }) => {
    const selection = event.detail.selectedOption.dataset;
    setRedisSize({
      storageGb: +(selection.storageGb ?? '0'),
      tier: selection.key ?? '',
    });
  };

  return (
    <div>
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
      <Select className="redis-select" onChange={onChange} id="redis-select">
        {redisConfigOptions.map((item) => (
          <Option
            key={item.key}
            data-key={item.key}
            data-storage-gb={item.storageGb}
          >
            {item.key}
          </Option>
        ))}
      </Select>
    </div>
  );
}
