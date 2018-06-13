import React, { Component } from 'react';
import HeaderColumn from './HeaderColumn';
import Column from './Column';
import { Container, Table, Header, Body, Row } from './styles';

export default class extends Component
{
    constructor(props, context)
    {
        super(props, context);

        this.state = {
            columns: this.props.columns,
            dataSource: this.props.dataSource,
            sorterColumn: null,
            sorterOrder: null,
            sorterFunc: null
        };
    }

    componentWillReceiveProps()
    {
        this.setState({
            columns: this.props.columns,
            dataSource: this.props.dataSource,
        });

        if (this.state.sorterColumn !== null) this.applySorting();
    }

    applySorting = () => {
        this.setState((prevState) => ({
            dataSource: [ ...prevState.dataSource.sort(prevState.sorterFunc) ]
        }));

        if (this.state.sorterOrder === 'desc')
            this.setState((prevState) => ({
                dataSource: [ ...prevState.dataSource.reverse() ]
            }));
    };

    compareBy = (column, compareFunc) => {
        if (this.state.sorterColumn === column)
            this.setState((prevState) => ({
                dataSource: [ ...prevState.dataSource.reverse() ],
                sorterOrder: prevState.sorterOrder === 'asc' ? 'desc' : 'asc'
            }));
        else
            this.setState((prevState) => ({
                dataSource: [ ...prevState.dataSource.sort(compareFunc) ],
                sorterColumn: column,
                sorterFunc: compareFunc,
                sorterOrder: 'asc'
            }));
    };

    render()
    {
        const { columns, dataSource } = this.state;

        return (
            <Container>
                <Table>
                    <Header>
                        <Row>
                            { columns.map((column, index) => <HeaderColumn key={index} { ...column } compareBy={this.compareBy} sorterColumn={this.state.sorterColumn} />) }
                        </Row>
                    </Header>
                    <Body>
                        { dataSource.map((item, index) => (
                            <Row key={index}>
                                { columns.map((column) => <Column key={`${column.index}-${index}`} { ...column } record={ item } />) }
                            </Row>
                        )) }
                    </Body>
                </Table>
            </Container>
        );
    }
}