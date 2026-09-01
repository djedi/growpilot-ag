import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const read = f => readFile(resolve(root, f), 'utf8');

test('all public HTML pages exist with complete document basics', async () => {
  for (const page of ['index.html','privacy.html','terms.html','success.html','404.html']) {
    const html = await read(page);
    assert.match(html, /<!doctype html>/i, page);
    assert.match(html, /<html lang="en">/i, page);
    assert.match(html, /<meta name="viewport"/i, page);
    assert.match(html, /<title>[^<]+<\/title>/i, page);
  }
});
test('early-access form contains required Netlify configuration and discovery fields', async () => {
  const html = await read('index.html');
  assert.match(html, /data-netlify="true"/);
  assert.match(html, /netlify-honeypot="bot-field"/);
  for (const name of ['name','email','company','role','operation-type','current-workflow','recurring-problem','interest-area']) assert.match(html, new RegExp(`name="${name}"`));
  assert.match(html, /action="\/success.html"/);
});
test('homepage has SEO, accessibility, and honest early-stage language', async () => {
  const html = await read('index.html');
  for (const fragment of ['rel="canonical" href="https://growpilot.ag/"','property="og:title"','class="skip-link"','id="main"','Illustrative interface concept','not a finished product']) assert.ok(html.includes(fragment), fragment);
  assert.ok(!/google-analytics|googletagmanager|fonts\.googleapis|<script\b/i.test(html));
});
test('crawler files and security configuration use the production domain', async () => {
  assert.match(await read('robots.txt'), /https:\/\/growpilot\.ag\/sitemap\.xml/);
  assert.match(await read('sitemap.xml'), /https:\/\/growpilot\.ag\/privacy\.html/);
  const config = await read('netlify.toml');
  for (const header of ['Content-Security-Policy','X-Content-Type-Options','X-Frame-Options','Referrer-Policy']) assert.ok(config.includes(header));
});
