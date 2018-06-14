import React, { Component } from 'react';
import Paginate from 'react-paginate';
import _ from 'lodash';
import HeaderColumn from './HeaderColumn';
import Column from './Column';
import { Container, Table, Header, Body, Row } from './styles';

export default class extends Component // TODO Сделать сортировку и фильтрацию
{
    static defaultProps = {
        pagination: false,
        countPerPage: 25,
        onRow: (record) => ({})
    };

    constructor(props, context)
    {
        super(props, context);

        this.state = {
            columns: this.props.columns,
            dataSource: this.props.dataSource,
            copySource: this.props.dataSource,
            sorterColumn: null,
            sorterOrder: null,
            sorterFunc: null,
            countPerPage: this.props.countPerPage,
            currentPage: 0,
            filters: []
        };
    }

    componentWillReceiveProps()
    {
        this.setState({
            columns: this.props.columns,
            dataSource: this.props.dataSource,
            copySource: this.props.dataSource
        });

        this.updateTable();
    }

    updateTable = () => {
        if (this.state.filters.length > 0)
            this.filterBy();
        else
            this.filterClear();

        if (this.state.sorterColumn !== null) this.applySorting();
    };

    applySorting = () => {
        this.setState((prevState) => ({
            copySource: [ ...prevState.copySource.sort(prevState.sorterFunc) ],
        }));

        if (this.state.sorterOrder === 'desc')
            this.setState((prevState) => ({
                copySource: [ ...prevState.copySource.reverse() ],
            }));
    };

    compareBy = (column, compareFunc) => {
        if (this.state.sorterColumn === column)
            this.setState((prevState) => ({
                copySource: [ ...prevState.copySource.reverse() ],
                sorterOrder: prevState.sorterOrder === 'asc' ? 'desc' : 'asc'
            }));
        else
            this.setState((prevState) => ({
                copySource: [ ...prevState.copySource.sort(compareFunc) ],
                sorterColumn: column,
                sorterFunc: compareFunc,
                sorterOrder: 'asc'
            }));
    };

    addFilter = (filter) => {
        this.setState((prevState) => ({ filters: [ ...prevState.filters, filter] }), () => this.updateTable());
    };

    removeFilter = (id) => {
        this.setState((prevState) => ({ filters: prevState.filters.filter((item) => item.filter !== id) }), () => this.updateTable());
    };

    filterBy = () => {
        let copy = [];

        this.state.filters.map((filter) => {
            copy.push(...this.state.dataSource.filter(filter.filterFunc));
        });

        this.setState({ copySource: _.uniq(copy) });
    };

    filterClear = () => {
        this.setState((prevState) => ({ copySource: prevState.dataSource }));
    };

    changePage = (data) => {
        this.setState({ currentPage: data.selected })
    };

    render()
    {
        const { columns, dataSource, copySource, currentPage, countPerPage } = this.state;

        let source = copySource;
        if (this.props.pagination)
            source = source.slice(currentPage * countPerPage, (currentPage + 1) * countPerPage);

        return (
            <Container>
                <Table>
                    <Header>
                        <Row>
                            { columns.map((column, index) => <HeaderColumn key={index} { ...column } compareBy={this.compareBy} addFilter={this.addFilter} removeFilter={this.removeFilter} sorterColumn={this.state.sorterColumn} source={dataSource} />) }
                        </Row>
                    </Header>
                    <Body>
                        { source.map((item, index) => (
                            <Row key={index}>
                                { columns.map((column) => <Column key={`${column.index}-${index}`} { ...column } record={ item } onRow={this.props.onRow} />) }
                            </Row>
                        )) }
                    </Body>
                </Table>
                { this.props.pagination ?
                    <Paginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={<a>...</a>}
                        breakClassName={"break"}
                        pageCount={copySource.length / countPerPage}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.changePage}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                    />
                : null }
            </Container>
        );
    }
}