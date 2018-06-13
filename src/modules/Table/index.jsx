import React, { Component } from 'react';
import Column from './Column';
import { Table, Header, Body, Row, HeaderRow, HeaderColumn } from './styles';

type Props = {
    columns: Array<any>,
    dataSource: Array<any>
};

export default class extends Component<Props>
{

    render()
    {
        const { columns, dataSource } = this.props;

        return (
            <Table>
                <Header>
                    <HeaderRow>
                        { columns.map((column, index) => <Column key={index} { ...column }>{ column.text }</Column>) }
                    </HeaderRow>
                </Header>
                <Body>
                { dataSource.map((row, index) => (
                    <Row>
                        { columns.map((column) => (
                            <Column key={index} { ...column }>{ row[column.index] }</Column>
                        )) }
                    </Row>
                )) }
                </Body>
            </Table>
        );
    }
}

/*export default class extends Component<Props>
{
    render()
    {
        const { columns, dataSource } = this.props;

        return (
            <Table>
                <Header>
                    <HeaderRow>
                        { columns.map((column, index) => <Column key={index} { ...column }>{ column.text }</Column>) }
                    </HeaderRow>
                </Header>
                <Body>
                    { dataSource.map((row, index) => (
                        <Row>
                            { columns.map((column) => (
                                <Column key={index} { ...column }>{ row[column.index] }</Column>
                            )) }
                        </Row>
                    )) }
                </Body>
            </Table>
        );
    }
}*/