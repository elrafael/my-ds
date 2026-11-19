import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'my-ds',
  globalStyle: 'src/styles/_tokens.scss',
  plugins: [
    sass({
      includePaths: ['src/styles'],
    })
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        { src: '../node_modules/@fontsource-variable/inter/files/*-wght-*.woff2', dest: 'fonts', warn: true },
        { src: '../node_modules/@fontsource-variable/inter/LICENSE', dest: 'fonts/INTER-LICENSE', warn: true },
      ],
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'docs-json',
      file: 'custom-elements.json',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        { src: '../node_modules/@fontsource-variable/inter/files/*-wght-*.woff2', dest: 'build/fonts', warn: true },
        { src: '../node_modules/@fontsource-variable/inter/LICENSE', dest: 'build/fonts/INTER-LICENSE', warn: true },
      ],
    },
    angularOutputTarget({
      componentCorePackage: 'my-ds',
      outputType: 'standalone',
      directivesProxyFile: '../my-ds-app/projects/my-ds-angular/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../my-ds-app/projects/my-ds-angular/src/lib/stencil-generated/index.ts',
    })
  ],
};
