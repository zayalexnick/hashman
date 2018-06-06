import styled from 'styled-components';
import * as Colors from 'constants/Colors';
import { Table as TableA, Form as FormA } from 'antd';

export const Layout = styled.div`
    display: flex;
    height: 100vh;
`;

export const Content = styled.div`
    width: 100%;
    margin-top: 70px;
    padding: 40px 20px;
    background: ${Colors.bg};
`;

export const Table = styled(TableA)`
  .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
    padding: 10px 16px;
    word-break: inherit;
  }
  
  .ant-table-body {
    overflow-x: auto;
    overflow-y: hidden;
  }
  
  table {
    max-width: 100%;
    word-break: inherit;
  }
`;

export const Form = styled(FormA)`
  position: ${props => props.type ? 'absolute' : 'relative'};
  bottom: 0;
  transform: translateY(${props => props.type ? '-25%' : 0});
  
  @media screen and (max-width: 420px) {
    position: relative;
    transform: translateX(0);
    
    .ant-row.ant-form-item {
      margin-right: 0;
    }
    
    .ant-form-item-control-wrapper {
      width: auto;
    }
  }
  
    .ant-row.ant-form-item {
      display: flex;
      align-items: center;
    }
    
    .ant-form-item-label {
      padding: 0;
      margin-right: 10px;
    }
`;