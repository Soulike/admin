import React, {useEffect, useState} from 'react';
import View from './View';
import {hljs} from '../../Singleton';
import useMaxJax from '../../Hook/useMaxJax';
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
        wrapper.querySelectorAll('pre').forEach(async (block) =>
        {
            hljs.highlightElement(block as HTMLSpanElement);
            await setImmediatePromise();
        });

        setWrapper(wrapper);

        setLoading(false);
    }, [HTMLContent]);

    useMaxJax([HTMLContent]);

    return (
        <View HTMLContent={wrapper.innerHTML} loading={loading} />
    );
}

export default React.memo(ArticleShower);