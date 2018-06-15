import React, { Component } from 'react';
import { Container, Header, Title, Tabs, Tab, Icon, Body, Item, ItemTitle, ItemText } from './styles';

export default class extends Component
{
    static defaultProps = {
        type: 'primary'
    };

    state = {
        current: 0
    };

    render()
    {
        const { title, items, type } = this.props;
        const { current } = this.state;

        return (
            <Container>
                <Header type={type}>
                    <Title>{ title }</Title>
                    <Tabs>
                        { items.map((item, index) => (
                            <Tab key={index} type={type} active={index === current} onClick={() => this.setState({ current: index })}>
                                <Icon>{ item.icon }</Icon>
                                { item.label }
                            </Tab>
                        )) }
                    </Tabs>
                </Header>
                <Body>
                    { items[current].items.map((item, index) => (
                        <Item key={index}>
                            <ItemTitle>{ item.title }</ItemTitle>
                            <ItemText>{ item.text }</ItemText>
                        </Item>
                    )) }
                </Body>
            </Container>
        );
    }
}