import { Window as KeplrWindow } from '@keplr-wallet/types';

declare global {
    interface Window extends KeplrWindow { }
}

export const ConnectKeplr = async () => {
    try {
        if (!window.keplr) {
            return alert('Please install keplr extention');
        }
        await window.keplr.experimentalSuggestChain({
            chainId: 'colosseum-1',
            chainName: 'FIRMACHAIN',
            chainSymbolImageUrl:
                'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/colosseum/chain.png',
            rpc: 'https://lcd-mainnet.firmachain.dev:26657',
            rest: 'https://lcd-mainnet.firmachain.dev:1317',
            nodeProvider: {
                name: 'FIRMACHAIN',
                email: 'contact@firmachain.org',
                website: 'https://firmachain.org',
            },
            bip44: {
                coinType: 7777777,
            },
            bech32Config: {
                bech32PrefixAccAddr: 'firma',
                bech32PrefixAccPub: 'firmapub',
                bech32PrefixValAddr: 'firmavaloper',
                bech32PrefixValPub: 'firmavaloperpub',
                bech32PrefixConsAddr: 'firmavalcons',
                bech32PrefixConsPub: 'firmavalconspub',
            },
            currencies: [
                {
                    coinDenom: 'FCT',
                    coinMinimalDenom: 'ufct',
                    coinDecimals: 6,
                    coinGeckoId: 'firmachain',
                },
            ],
            feeCurrencies: [
                {
                    coinDenom: 'FCT',
                    coinMinimalDenom: 'ufct',
                    coinDecimals: 6,
                    coinGeckoId: 'firmachain',
                    gasPriceStep: {
                        low: 0.1,
                        average: 0.25,
                        high: 0.3,
                    },
                },
            ],
            stakeCurrency: {
                coinDenom: 'FCT',
                coinMinimalDenom: 'ufct',
                coinDecimals: 6,
                coinGeckoId: 'firmachain',
            },
            features: [],
        });
        const chainId = 'colosseum-1';
        await window.keplr.enable(chainId);
    } catch (e) {
        console.log(e);
    }
};