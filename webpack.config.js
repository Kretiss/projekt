const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

let mode = "development";
let target = "web";
const plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CssMinimizerPlugin(),
    new HtmlWebpackPlugin({
        template: "./src/index.html"
    }),
];

if(process.env.NODE_ENV === "production"){
    mode = "production";
    target = "browserslist";
}
if(process.env.SERVE){
    plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports ={
    mode: mode,
    target: target,

    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "images/[hash][ext][query]",
    },

    module: {
        rules: [
            {
              test: /\.(png|jpe?g|svg)$/i,
              type: "asset",
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "" },
                    },
                    "css-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }]
            },
        ],
    },
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
        ],
    },

    plugins: plugins,

    resolve: {
        extensions: [".js", ".jsx"],
    },

    devtool: "source-map",
    devServer: {
        contentBase: "./dist",
        hot: true,
        historyApiFallback: true,
    }
}