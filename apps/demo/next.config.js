//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');
const path = require('path');


const isSSRBuild = process.env.AMPLIFY_SSR_BUILD === 'true';

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack(config, { defaultLoaders }) {
    if (isSSRBuild) {
      config.module.rules.push({
        test: /\.([jt])sx?$/,
        include: [path.join(__dirname, '../../libs')],
        exclude: /node_modules/,
        use: [defaultLoaders.babel],
      });
    }

    return config;
  }
};

module.exports = withNx(nextConfig);
