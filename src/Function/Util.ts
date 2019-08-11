export function appendScript(url: string): void
{
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.body.append(script);
}