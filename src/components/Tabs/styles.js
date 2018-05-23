import styled from 'styled-components';

const AntTab = ComponentName => styled(ComponentName)`
  &.ant-tabs {
    &:not(.ant-tabs-vertical) {
      > .ant-tabs-content-animated {
        display: flex;
      }
    }

    .ant-tabs-nav {
      .ant-tabs-tab {
        margin: 0 24px 0 0;

        .anticon:not(.anticon-close) {
          margin: 0 8px 0 0;

          &.anticon-close{
            right: 2px;
          }
        }
      }
    }

    .ant-tabs-tab-prev {
      left: 0;

    }

    .ant-tabs-tab-next {
      right: 2px;
    }

    &.ant-tabs-vertical{
      .ant-tabs-tab-prev,
      .ant-tabs-tab-next{
        transform: rotate(0);
      }
    }
  }
`;

export default AntTab;
