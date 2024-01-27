import React, { useState } from 'react';
import { JSX } from 'react/jsx-runtime';

//
// Проверяем число на валидность
function isValidNumber(value:any) {
  return typeof value === 'number';
}
//
// Проверяем дату на валидность
function isValidDate(value:any) {
  let isValid = new Date(value);
  return (
    null !== isValid &&
    !isNaN(isValid) &&
    'undefined' !== typeof isValid.getDate
  );
}

function New(props:any) {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children}
    </div>
  );
}

function Popular(props:any) {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children}
    </div>
  );
}

function Article(props:any) {
  return (
    <div className="item item-article">
      <h3>
        <a href="#">{props.title}</a>
      </h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  );
}

function Video(props:any) {
  return (
    <div className="item item-video">
      <iframe
        src={props.url}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <p className="views">Просмотров: {props.views}</p>
    </div>
  );
}

//
// Обертка для функционального компонента DateTime, форматирующая дату к требуемому виду
// Для дат старше более 10 дней сделал вывод в начальном формате
function Item(Component: JSX.IntrinsicAttributes) {
  return class extends React.Component {
    constructor(props:any) {
      super(props);
    }
    //
    componentDidMount() {}
    componentDidUpdate() {}
    componentWillUnmount() {}
    //
    render() {
      let views = this.props.views;
      if (views > 1000) {
        return (
          <Popular {...this.props} children={<Component {...this.props} />} />
        );
      } else if (views < 100) {
        return <New {...this.props} children={<Component {...this.props} />} />;
      } else {
        return <Component {...this.props} />;
      }
    }
  };
}
//
//
// Создаем компонент для вывода
const WrappedVideo = Item(Video);
const WrappedArticle = Item(Article);
//
//

function List(props:any) {
  return props.list.map((item:any) => {
    switch (item.type) {
      case 'video':
        return <WrappedVideo {...item} />;

      case 'article':
        return <WrappedArticle {...item} />;
    }
  });
}

export default function App() {
  const [list, setList] = useState([
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      views: 50,
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      views: 228,
    },
    {
      type: 'article',
      title: 'Невероятные события в неизвестном поселке...',
      views: 175,
    },
    {
      type: 'article',
      title: 'Секретные данные были раскрыты!',
      views: 1532,
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      views: 4253,
    },
    {
      type: 'article',
      title: 'Кот Бегемот обладает невероятной...',
      views: 12,
    },
  ]);

  return <List list={list} />;
}
