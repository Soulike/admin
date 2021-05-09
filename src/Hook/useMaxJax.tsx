import {DependencyList, useEffect} from 'react';
import {loadExternalScript, loadScript} from '../Function/Script';

/**
 * @description Load MaxJax to render Math for whole page.
 * Due to the design of Mathjax, the hook need to reload MaxJax files when the content of the page changes.
 *
 * @param config MathJax config
 * @param deps When the items in deps changed, MaxJax will be reloaded.
 * */
function useMaxJax(config: Readonly<any>, deps?: Readonly<DependencyList>)
{
    const configId = 'mathjax-config';
    const CDNId = 'mathjax-cdn';
    const typesetId = 'mathjax-typeset';
    const $body = document;

    useEffect(() =>
    {
        async function loadMathJax()
        {
            const $config = $body.getElementById(configId);
            const $cdn = $body.getElementById(CDNId);
            const $typeset = $body.getElementById(typesetId);
            const GLOBAL_VAR_NAME = 'MathJax';  // MathJax global variable name
            if (!$config)   // load config first
            {
                await loadScript(`${GLOBAL_VAR_NAME} = ${JSON.stringify(config)};`, {id: configId});
            }
            if (!$cdn)  // load CDN
            {
                await loadExternalScript('https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js', {
                    id: CDNId,
                    async: 'true',
                });
            }
            if ($config && $cdn)    // if config and CDN have been both loaded
            {
                // re-run typeset() to render new content
                if ($typeset !== null)
                {
                    $typeset.remove();
                }
                await loadScript(`${GLOBAL_VAR_NAME}.typesetPromise()`, {id: typesetId});
            }
        }

        loadMathJax();
    }, [$body, config, deps]);
}

export default useMaxJax;