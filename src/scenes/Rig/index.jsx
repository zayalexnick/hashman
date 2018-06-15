import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import * as actions from '~/scenes/Servers/actions';
import Title from '~/components/Title';
import { Row, Col } from '~/components/Grid';
import Sticker from '~/components/Sticker';
import Stat from '~/components/Stat';
import WrenchIcon from 'react-icons/lib/md/build';
import CogsIcon from 'react-icons/lib/fa/cogs';
import MemoryIcon from 'react-icons/lib/md/memory';
import VideoIcon from 'react-icons/lib/md/personal-video';
import { Buttons, Button } from './styles';
import RestartIcon from 'react-icons/lib/io/android-refresh';
import EditIcon from 'react-icons/lib/io/edit';

const Settings = () => (
    <Buttons>
        <Button type="primary"><div className="icon"><EditIcon /></div><span>Редактировать</span></Button>
        <Button type="warning"><div className="icon"><RestartIcon /></div><span>Перезагрузить</span></Button>
    </Buttons>
);

@hot(module)
@connect((state) => ({
    rig: state.rig
}), actions)
export default class extends Component
{
    async componentDidMount()
    {
        //await this.props.getRig(this.props.match.params.id);
    }

    render()
    {
        return (
            <div>
                <Title right={<Settings />}>Рига: Название</Title>
                <Row>
                    <Col xs={12} bg={6} lg={3}>
                        <Sticker type="primary" icon={<WrenchIcon />} title="Материнская плата">ASRock H81 Pro BTC R2.0</Sticker>
                    </Col>
                    <Col xs={12} bg={6} lg={3}>
                        <Sticker type="success" icon={<CogsIcon />} title="Процессор">Intel(R) Celeron(R) CPU G1840 @ 2.80GHz</Sticker>
                    </Col>
                    <Col xs={12} bg={6} lg={3}>
                        <Sticker type="error" icon={<MemoryIcon />} title="Оперативная память">7923 MB</Sticker>
                    </Col>
                    <Col xs={12} bg={6} lg={3}>
                        <Sticker type="warning" icon={<VideoIcon />} title="GPU">NVIDIA 3 шт.</Sticker>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6} bg={4}>
                        <Stat title="Характеристики" items={[
                            {
                                label: 'Состояние',
                                icon: <MemoryIcon />,
                                items: [
                                    {
                                        title: 'Состояние',
                                        text: 'в сети'
                                    },
                                    {
                                        title: 'Статус',
                                        text: 'MINING'
                                    },
                                    {
                                        title: 'Скорость',
                                        text: '56.01 MH/s'
                                    },
                                    {
                                        title: 'Uptime',
                                        text: 'день'
                                    },
                                ]
                            },
                            {
                                label: 'Установки',
                                icon: <RestartIcon />,
                                items: [
                                    {
                                        title: 'IP',
                                        text: '192.168.88.204'
                                    },
                                    {
                                        title: 'Pool',
                                        text: 'pool.intelicom.ru:8008'
                                    },
                                    {
                                        title: 'Режим',
                                        text: 'ETH'
                                    },
                                    {
                                        title: 'Хз что это',
                                        text: '0xca3680af8106780c6fab55dc53216837f204d9c0'
                                    },
                                ]
                            },
                            {
                                label: 'Установки',
                                icon: <CogsIcon />,
                                items: [
                                    {
                                        title: 'Установлен режим',
                                        text: 'eth2'
                                    },
                                    {
                                        title: 'Установка частоты GPU',
                                        text: '-200'
                                    },
                                    {
                                        title: 'Установка частоты памяти',
                                        text: '1100'
                                    },
                                    {
                                        title: 'Питание GPU',
                                        text: '100Вт'
                                    },
                                ]
                            }
                        ]} />
                    </Col>
                </Row>
            </div>
        );
    }
}