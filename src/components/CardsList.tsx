import React from 'react';
import { Card } from './Card';
import { ICardData } from '../interfaces/ICardData';

export interface ICardsListProps {
  listName: string;
  cardsList: Array<ICardData>;
}

export class CardsList extends React.Component<ICardsListProps> {
  render() {
    return (
      <div className="mt-16">
        <h3 className="text-gray-600 text-2xl font-medium">{}</h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {this.props.cardsList.map((el) => (
            <Card {...el} key={el.id} />
          ))}
        </div>
      </div>
    );
  }
}
