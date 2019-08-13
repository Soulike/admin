import React from 'react';
import Style from './Style.module.scss';
import {hljs} from '../../Singleton';

interface Props
{
    HTMLContent: string,
}

function ArticleShowerView(props: Props)
{
    const {HTMLContent} = props;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = HTMLContent;
    wrapper.querySelectorAll('pre code').forEach((block) =>
    {
        hljs.highlightBlock(block);
    });

    MathJax.Hub.Queue(['Typeset', MathJax.Hub, wrapper]);

    return (
        <article className={Style.ArticleShower} dangerouslySetInnerHTML={{__html: wrapper.innerHTML}} />
    );
}

export default React.memo(ArticleShowerView);