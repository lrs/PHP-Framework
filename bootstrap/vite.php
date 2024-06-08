<?php
// Helpers here serve as example. Change to suit your needs.
const VITE_HOST = 'http://localhost:5173';
const VITE_OUT_DIR = '/assets/';

// Prints all the html entries needed for Vite.
function viteEntries(string $entry): string
{
    $entries = viteJs($entry)
        . "\r\n" . viteCss($entry);

    return $entries;
}

// Some dev/prod mechanism would exist in your project.
// This method is very useful for the local server.
// If we try to access it, and by any means, haven't started Vite yet
// then it will fallback to load the production files from manifest
// so you still navigate your site as intended!
function viteIsDev(string $entry): bool
{
    static $exists = null;

    if ($exists !== null) {
        return $exists;
    }

    $handle = curl_init(VITE_HOST . '/' . $entry);

    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);

    curl_setopt($handle, CURLOPT_NOBODY, true);

    curl_exec($handle);

    $error = curl_errno($handle);

    curl_close($handle);

    return $exists = !$error;
}

// Helpers to locate files.
function viteGetManifest(): array
{
    static $viteManifest = null;

    if (null !== $viteManifest) {
        return $viteManifest;
    }

    $content = file_get_contents(__DIR__ . '/../public' . VITE_OUT_DIR . 'manifest.json');

    return $viteManifest = json_decode($content, true);
}

// Helpers to print tags.
function viteJs(string $entry): string
{
    static $viteClientUrl = '';

    $viteManifest = viteGetManifest();

    $jsUrl = '';

    if (isset($viteManifest[$entry]) && array_key_exists('name', $viteManifest[$entry])) {
        $jsUrl = VITE_OUT_DIR . $viteManifest[$entry]['file'];
    }

    $url = viteIsDev($entry) ? VITE_HOST . '/' . $entry : $jsUrl;

    if (!$url) {
        return '';
    }

    $viteScriptUrl = '<script type="module" src="' . $url . '"></script>';

    // return this only once?
    if (viteIsDev($entry) && '' == $viteClientUrl) {
        $viteClientUrl = '<script type="module" src="' . VITE_HOST . '/@vite/client"></script>';
        return $viteClientUrl . "\r\n" . $viteScriptUrl;
    }

    return $viteScriptUrl;
}

function viteCss(string $entry): string
{
    // not needed on dev, it's inject by Vite.
    if (viteIsDev($entry)) {
        return '';
    }

    $viteManifest = viteGetManifest();

    $urls = [];

    foreach ($viteManifest as $key => $value) {
        if ($entry === $key && str_ends_with($key, 'css')) {
            $urls[] = VITE_OUT_DIR . $value['file'];
        }
    }

    $tags = '';

    foreach ($urls as $url) {
        $tags .= '<link rel="stylesheet" href="'
            . $url
            . '">';
    }

    return $tags;
}
