import * as React from 'react';
import {ICard} from "./gameCards";
import CardBack from './media/back';
import Card_2 from './media/-2';
import Card_1 from './media/-1';
import Card0 from './media/0';
import Card1 from './media/1';
import Card2 from './media/2';
import Card3 from './media/3';
import Card4 from './media/4';
import Card5 from './media/5';
import Card6 from './media/6';
import Card7 from './media/7';
import Card8 from './media/8';
import Card9 from './media/9';
import Card10 from './media/10';
import Card11 from './media/11';
import Card12 from './media/12';

export class GameCard extends React.Component<ICard, any> {

    static defaultProps: ICard = {
        value: 0,
        show: false
    }

    cardImage = () => {
        let img;
        switch (this.props.value) {
            case -2:
                img = <Card_2 />;
                break;
            case -1:
                img = <Card_1 />;
                break;
            case 0:
                img = <Card0 />;
                break;
            case 1:
                img = <Card1 />;
                break;
            case 2:
                img = <Card2 />;
                break;
            case 3:
                img = <Card3 />;
                break;
            case 4:
                img = <Card4 />;
                break;
            case 5:
                img = <Card5 />;
                break;
            case 6:
                img = <Card6 />;
                break;
            case 7:
                img = <Card7 />;
                break;
            case 8:
                img = <Card8 />;
                break;
            case 9:
                img = <Card9 />;
                break;
            case 10:
                img = <Card10 />;
                break;
            case 11:
                img = <Card11 />;
                break;
            case 12:
                img = <Card12 />;
                break;
            default:
                img = <CardBack />;
                break;
        }
        return img
    }

    render () {
        const img = this.cardImage();
        return (
            <div>
                {img}
            </div>
        );
    }
}