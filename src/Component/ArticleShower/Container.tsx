import React, {useEffect, useState} from 'react';
import View from './View';
import {hljs} from '../../Singleton';
import useMaxJax from '../../Hook/useMaxJax';
import {MATH_JAX} from '../../CONFIG';
import {setImmediatePromise} from '../../Function/Promisify';

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
        wrapper.querySelectorAll('pre code').forEach(async (block) =>
        {
            hljs.highlightElement(block);
            await setImmediatePromise();
        });

        setWrapper(wrapper);

        setLoading(false);
    }, [HTMLContent]);

    useMaxJax(MATH_JAX, [HTMLContent]);

    return (
        <View HTMLContent={wrapper.innerHTML} loading={loading} />
    );
}

export default React.memo(ArticleShower);