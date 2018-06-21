import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Paginate from 'react-paginate';
import _ from 'lodash';
import HeaderColumn from './HeaderColumn';
import Column from './Column';
import { Toggle } from '~/components/Form';
import { Container, TableContainer, Table, Header, Body, Row, Pagination } from './styles';

export default class extends Component // TODO Сделать сортировку и фильтрацию
{
    static defaultProps = {
        pagination: false,
        countPerPage: 25,
        fixedHeader: false,
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
            filters: {},
            pagination: this.props.pagination,
            fixedHeader: this.props.fixedHeader,
            headerHeight: 0,
            headerPosition: 0,
            columnWidth: {}
        };
    }

    componentDidMount()
    {
        this.setState({ headerHeight: findDOMNode(this.refs.header).offsetHeight });

        window.addEventListener('scroll', this._onScroll);
    }

    _onScroll = () => {
        const currentPosition = -(findDOMNode(this.refs.table).getBoundingClientRect().top - 80);
        if (currentPosition >= 0)
            this.setState({ headerPosition: currentPosition });
        else
            this.setState({ headerPosition: 0 });
    };

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
        this.filterBy();

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

    addFilter = async (filter) => {
        let currentFilters = [];
        if (typeof this.state.filters[filter.column] !== 'undefined')
            currentFilters = this.state.filters[filter.column];

        await this.setState((prevState) => ({ filters: { ...prevState.filters, [filter.column]: [ ...currentFilters, filter ] } }));
        this.updateTable();
    };

    removeFilter = async (filter) => {
        await this.setState((prevState) => ({ filters: { ...prevState.filters, [filter.column]: [ ...prevState.filters[filter.column].filter((item) => item.filter !== filter.id) ] } }));
        if (this.state.filters[filter.column].length === 0) {
            const filters = this.state.filters;

            let newFilters = {};

            Object.keys(filters).filter((item) => item !== filter.column).map((item) => newFilters[item] = filters[item]);

            await this.setState({ filters: newFilters });
        }

        this.updateTable();
    };

    filterBy = () => {
        if (Object.keys(this.state.filters).length > 0)
        {
            let filterByColumn = [];

            for (let column in this.state.filters) {
                const copy = [];

                this.state.filters[column].map((filter) => {
                    copy.push(...this.state.dataSource.filter(filter.filterFunc));
                });

                filterByColumn.push(_.uniq(copy));
            }

            this.setState({ copySource: _.intersectionWith(...filterByColumn, _.isEqual) });
        }
        else {
            this.setState({ copySource: this.state.dataSource });
        }
    };

    changePage = (data) => {
        this.setState({ currentPage: data.selected })
    };

    setColumnWidth = async (column, width) => {
        await this.setState((prevState) => ({ columnWidth: { ...prevState.columnWidth, [column]: width } }));
    };

    render()
    {
        const { columns, dataSource, copySource, currentPage, countPerPage, pagination } = this.state;

        let source = copySource;
        if (pagination)
            source = source.slice(currentPage * countPerPage, (currentPage + 1) * countPerPage);

        return (
            <Container>
                <TableContainer>
                    { this.state.fixedHeader ? (
                        <Table fixed top={this.state.headerPosition}>
                            <Header ref="header">
                                <Row>
                                    { columns.map((column, index) => <HeaderColumn ref={column.index} width={this.state.columnWidth[column.index]} key={index} { ...column } compareBy={this.compareBy} addFilter={this.addFilter} removeFilter={this.removeFilter} sorterColumn={this.state.sorterColumn} activeFilter={Object.keys(this.state.filters).includes(column.index)} source={dataSource} />) }
                                </Row>
                            </Header>
                        </Table>
                    ) : null }
                    <Table ref="table" topOffset={this.state.headerHeight}>
                        { !this.state.fixedHeader ? (
                            <Header ref="header">
                                <Row>
                                    { columns.map((column, index) => <HeaderColumn key={index} { ...column } compareBy={this.compareBy} addFilter={this.addFilter} removeFilter={this.removeFilter} sorterColumn={this.state.sorterColumn} activeFilter={Object.keys(this.state.filters).includes(column.index)} source={dataSource} />) }
                                </Row>
                            </Header>
                        ) : null }
                        <Body>
                            { source.map((item, index) => (
                                <Row key={index}>
                                    { columns.map((column) => <Column key={`${column.index}-${index}`} { ...column } record={ item } onRow={this.props.onRow} setColumnWidth={this.setColumnWidth} />) }
                                </Row>
                            )) }
                        </Body>
                    </Table>
                </TableContainer>
                <Pagination>
                    { copySource.length / countPerPage > 1 ? <Toggle checked={!this.state.pagination} onChange={() => this.setState({ pagination: !this.state.pagination })}>Показать все</Toggle> : null }
                    { pagination && copySource.length / countPerPage > 1 ?
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
                </Pagination>
            </Container>
        );
    }
}