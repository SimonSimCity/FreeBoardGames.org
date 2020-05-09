import * as React from 'react';
import {GameCard} from "./gameCard";
import Grid from '@material-ui/core/Grid';

export interface ICard {
    value: number;
    show: Boolean;
    onClick?: (e: any) => void;
}
interface IBoard {
    cards: Array<Array<ICard>>
}

type rowType = boolean | 1 | "auto" | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export class GameCards extends React.Component<IBoard, any> {

    static defaultProps: IBoard = {
        cards: GameCards.initGame()
    }

    state: IBoard = {
        cards: this.props.cards
    }

    private static initGame(): Array<Array<ICard>> {
        let card: ICard = {
            value: 1,
            show: false
        };
        return [
            [card, Object.assign({}, card), Object.assign({}, card), Object.assign({}, card)],
            [Object.assign({}, card), Object.assign({}, card), Object.assign({}, card), Object.assign({}, card)],
            [Object.assign({}, card), Object.assign({}, card), Object.assign({}, card), Object.assign({}, card)],
            [Object.assign({}, card), Object.assign({}, card), Object.assign({}, card), Object.assign({}, card)]
        ];
    }

    removeColumn = (col:number) => { // 1 to 4
        if (this.state.cards && this.state.cards[0].length >= col) {
            this.setState({
                cards: this.state.cards.map(card_row => {
                    delete card_row[col];
                    return card_row.filter(c => c !== undefined)
                }) as ICard[][]
            });
        } else {
            // TODO: throw error
        }
    }

    removeRow = (row:number) => { // 1 to 4
        if (this.state.cards && this.state.cards.length >= row) {
            let card_rows = this.state.cards;
            delete card_rows[row];
            this.setState({
                cards: card_rows.filter(c => c !== undefined) as ICard[][]
            });
        } else {
            // TODO: throw error
        }
    }

    flipCard = (col: number, row:number) => {
        if (this.state.cards
            && this.state.cards.length >= row
            && this.state.cards[0].length >= col) {
            let cards = this.state.cards;
            cards[row - 1][col - 1].show = !cards[row - 1][col - 1].show;
            this.setState({
                cards: this.state.cards
            });
            console.log(cards);
        } else {
            // TODO: throw error
        }
    }
    row_num = (row: number): rowType => {
        return (12 / row) as rowType;
    }

    render () {
        return (
            <Grid container
                xs={12}>
                {this.state.cards.map((card_row: ICard[], index_row: number) => (
                    <Grid container
                          item
                          spacing={3}
                          xs={this.row_num(card_row.length)}
                          key={index_row} >
                        {card_row.map((card: ICard, index_col: number) => (
                            <Grid container
                                  item
                                  spacing={3}
                                  xs={12}
                                  key={index_col} >
                                <div onClick={() => this.flipCard(index_col + 1, index_row + 1)} >
                                    <GameCard value={card.value}
                                          show={card.show} />
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
        );
    }
}