import React, {useEffect, useState} from 'react';
import View from './View';
import {hljs} from '../../Singleton';
import '../../ModuleConfig/MathJax';

interface IProps
{
    HTMLContent: string,
}

function ArticleShower(props: IProps)
{
    const [wrapper, setWrapper] = useState(document.createElement('div'));
    const [loading, setLoading] = useState(false);
    const {HTMLContent} = props;

    useEffect(() =>
    {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = HTMLContent;

        setLoading(true);
        wrapper.querySelectorAll('pre code').forEach((block) =>
        {
            hljs.highlightBlock(block);
        });

        MathJax.Hub.Queue(['Typeset', MathJax.Hub, wrapper, () =>
        {
            setWrapper(wrapper);
            setLoading(false);
        }]);
    }, [HTMLContent]);

    return (
        <View HTMLContent={wrapper.innerHTML} loading={loading} />
    );
}

export default React.memo(ArticleShower);