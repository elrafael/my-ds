import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'my-ds',
  plugins: [
    sass()
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
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
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    angularOutputTarget({
      componentCorePackage: 'my-ds',
      outputType: 'standalone',
      directivesProxyFile: '../my-ds-app/projects/my-ds-angular/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../my-ds-app/projects/my-ds-angular/src/lib/stencil-generated/index.ts',
    })
  ],
};
