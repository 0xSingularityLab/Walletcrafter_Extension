
  //===============================================
  // 1. 界面多语言文本
  //===============================================
  const translations = {
    zh: {
      pageTitle: "钱包工坊 - 一键生成多链钱包（BTC/ETH(EVM)/TRON/SOL/BCH/SUI/DOGE）",
      mainTitle1: "钱包工坊",
      mainTitle2: "一键生成多链钱包（BTC/ETH/TRON/SOL/BCH/SUI/DOGE）",
      mainTitle3: "无需联网，保存网页本地打开也可以生成钱包。",
      labelCount: "生成助记词数量：",
      btnGenerate: "生成助记词",
      labelMnemonicLang: "助记词语言：",
      labelZhRadio: "中文助记词",
      labelEnRadio: "英文助记词",
      uiLangZh: "中文",
      uiLangEn: "英文",
      copy: "复制",
      copyAll: "复制当前信息",
      copySuccess: "复制成功",
      fieldIndex: "序号",
      fieldMnemonic: "助记词(12词)：",
      fieldBTC: "BTC 隔离见证：",
      fieldBTCLegacy: "BTC Legacy：",
      fieldETH: "ETH 以太坊(EVM)：",
      fieldTRON: "TRON (TRX)：",
      fieldSOL: "Solana：",
      fieldBCH: "BCH：",
      fieldSUI: "Sui：",
      fieldDOGE: "DOGE：",
    },
    en: {
      pageTitle: "WalletCrafter - Craft your multichain wallet in seconds (BTC/ETH(EVM)/TRON/SOL/BCH/SUI/DOGE)",
      mainTitle1: "WalletCrafter",
      mainTitle2: "Create multi-chain wallets in one click (BTC/ETH/TRON/SOL/BCH/SUI/DOGE)",
      mainTitle3: "Works offline — you can also save and open locally to create wallets.",
      labelCount: "Number of mnemonics:",
      btnGenerate: "Generate",
      labelMnemonicLang: "Mnemonic Language:",
      labelZhRadio: "Chinese Mnemonic",
      labelEnRadio: "English Mnemonic",
      uiLangZh: "Chinese",
      uiLangEn: "English",
      copy: "Copy",
      copyAll: "Copy All",
      copySuccess: "Copied!",
      fieldIndex: "Number",
      fieldMnemonic: "Mnemonic (12 words):",
      fieldBTC: "BTC SegWit:",
      fieldBTCLegacy: "BTC Legacy:",
      fieldETH: "ETH (EVM):",
      fieldTRON: "TRON:",
      fieldSOL: "Solana:",
      fieldBCH: "BCH:",
      fieldSUI: "Sui:",
      fieldDOGE: "DOGE:",
    }
  };

  // 当前界面语言
  let currentUILang = 'zh';

  function updateUI(lang) {
    document.title = translations[lang].pageTitle;
    document.getElementById("mainTitle1Text").textContent = translations[lang].mainTitle1;
    document.getElementById("mainTitle2").textContent = translations[lang].mainTitle2;
    document.getElementById("mainTitle3").textContent = translations[lang].mainTitle3;
    document.getElementById("labelCount").textContent = translations[lang].labelCount;
    document.getElementById("generateBtn").textContent = translations[lang].btnGenerate;
    document.getElementById("labelMnemonicLang").textContent = translations[lang].labelMnemonicLang;
    document.getElementById("labelZhRadio").textContent = translations[lang].labelZhRadio;
    document.getElementById("labelEnRadio").textContent = translations[lang].labelEnRadio;
    document.getElementById("uiLangZh").textContent = translations[lang].uiLangZh;
    document.getElementById("uiLangEn").textContent = translations[lang].uiLangEn;
    document.querySelectorAll('.social-icons [data-lang]').forEach(el => {
      el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
    });
  }

  // DOM 元素
  const mnemonicCountInput = document.getElementById('mnemonicCount');
  const generateBtn = document.getElementById('generateBtn');
  const resultTableBody = document.querySelector('#resultTable tbody');

  const uiLangZhBtn = document.getElementById('uiLangZh');
  const uiLangEnBtn = document.getElementById('uiLangEn');

  // 1. 在全局声明 wallets
  let wallets = [];

  // 2. 修改 renderWallets，接收参数 isNew
  function renderWallets(isNew = false) {
    const count = parseInt(mnemonicCountInput.value, 10) || 1;
    const walletList = document.getElementById('walletList');
    walletList.innerHTML = '';

    // 只有在 isNew 为 true 时才生成新数据
    if (isNew) {
      wallets = [];
      for (let i = 0; i < count; i++) {
        const { mnemonic, btcLegacyAddr, btcAddr, ethAddr, tronAddr, solAddr, bchCashAddr, suiAddr, dogeAddr } = generateOneWallet();
        wallets.push({ mnemonic, btcLegacyAddr, btcAddr, ethAddr, tronAddr, solAddr, bchCashAddr, suiAddr, dogeAddr });
      }
    }

    // 渲染卡片（用 wallets 里的数据）
    for (let i = 0; i < wallets.length; i++) {
      const w = wallets[i];
      const card = document.createElement('div');
      card.className = 'wallet-card';
      card.innerHTML = `
        <div class="wallet-index">
          ${translations[currentUILang].fieldIndex}：${i + 1}
          <button class="copy-all-btn" data-index="${i}">${translations[currentUILang].copyAll}</button>
        </div>
        <div class="wallet-field"><span class="field-label">${translations[currentUILang].fieldMnemonic}</span><span class="field-value">${w.mnemonic}</span>
          <button class="copy-button" data-copy="${w.mnemonic}">${translations[currentUILang].copy}</button>
        </div>
        <div class="wallet-field"><span class="field-label">${translations[currentUILang].fieldBTC}</span><span class="field-value">${w.btcAddr}</span>
          <button class="copy-button" data-copy="${w.btcAddr}">${translations[currentUILang].copy}</button>
        </div>
        <div class="wallet-field"><span class="field-label">${translations[currentUILang].fieldBTCLegacy}</span><span class="field-value">${w.btcLegacyAddr}</span>
          <button class="copy-button" data-copy="${w.btcLegacyAddr}">${translations[currentUILang].copy}</button>
        </div>
        <div class="wallet-field"><span class="field-label">${translations[currentUILang].fieldETH}</span><span class="field-value">${w.ethAddr}</span>
          <button class="copy-button" data-copy="${w.ethAddr}">${translations[currentUILang].copy}</button>
        </div>
        <div class="wallet-field"><span class="field-label">${translations[currentUILang].fieldTRON}</span><span class="field-value">${w.tronAddr}</span>
          <button class="copy-button" data-copy="${w.tronAddr}">${translations[currentUILang].copy}</button>
        </div>
        <div class="wallet-field"><span class="field-label">${translations[currentUILang].fieldSOL}</span><span class="field-value">${w.solAddr}</span>
          <button class="copy-button" data-copy="${w.solAddr}">${translations[currentUILang].copy}</button>
        </div>
        <div class="wallet-field"><span class="field-label">${translations[currentUILang].fieldBCH}</span><span class="field-value">${w.bchCashAddr}</span>
          <button class="copy-button" data-copy="${w.bchCashAddr}">${translations[currentUILang].copy}</button>
        </div>
        <div class="wallet-field"><span class="field-label">${translations[currentUILang].fieldSUI}</span><span class="field-value">${w.suiAddr || ''}</span>
          <button class="copy-button" data-copy="${w.suiAddr || ''}">${translations[currentUILang].copy}</button>
        </div>
        <div class="wallet-field"><span class="field-label">${translations[currentUILang].fieldDOGE}</span><span class="field-value">${w.dogeAddr || ''}</span>
          <button class="copy-button" data-copy="${w.dogeAddr || ''}">${translations[currentUILang].copy}</button>
        </div>
      `;
      walletList.appendChild(card);
    }

    // 绑定单个字段复制
    document.querySelectorAll('.copy-button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = e.target.getAttribute('data-copy');
        navigator.clipboard.writeText(text).then(() => {
          showCopyTipNearBtn(e.target, translations[currentUILang].copySuccess);
        });
      });
    });

    // 绑定"复制当前信息"
    document.querySelectorAll('.copy-all-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'), 10);
        const w = wallets[idx];
        const t = translations[currentUILang];
        const allText =
          `${t.fieldMnemonic}${w.mnemonic}\n` +
          `${t.fieldBTC}${w.btcAddr}\n` +
          `${t.fieldBTCLegacy}${w.btcLegacyAddr}\n` +
          `${t.fieldETH}${w.ethAddr}\n` +
          `${t.fieldTRON}${w.tronAddr}\n` +
          `${t.fieldSOL}${w.solAddr}\n` +
          `${t.fieldBCH}${w.bchCashAddr}\n` +
          `${t.fieldSUI}${w.suiAddr || ''}\n` +
          `${t.fieldDOGE}${w.dogeAddr || ''}`;
        navigator.clipboard.writeText(allText).then(() => {
          showCopyTipNearBtn(e.target, translations[currentUILang].copySuccess);
        });
      });
    });
  }

  // 3. 生成按钮事件，传 true
  generateBtn.addEventListener('click', () => renderWallets(true));

  // 4. 切换语言时，只刷新UI和卡片，不生成新数据
  uiLangZhBtn.addEventListener('click', () => {
    currentUILang = 'zh';
    updateUI(currentUILang);
    renderWallets(false);
  });
  uiLangEnBtn.addEventListener('click', () => {
    currentUILang = 'en';
    updateUI(currentUILang);
    renderWallets(false);
  });

  // 5. 页面加载时不自动生成钱包

  //===============================================
  // 生成单个钱包 (BTC/ETH/Tron/SOL)，12词助记词
  function generateOneWallet() {
    // 读取助记词语言单选
    const checked = document.querySelector('input[name="mnLang"]:checked');
    const mnemonicLang = checked ? checked.value : 'en';

    // 1) 生成12词助记词 (128位熵)
    let mnemonic;
    if (
      mnemonicLang === 'zh' &&
      window.MyLibrary.bip39.wordlists &&
      window.MyLibrary.bip39.wordlists.chinese_simplified
    ) {
      mnemonic = window.MyLibrary.bip39.generateMnemonic(
        128,
        undefined,
        window.MyLibrary.bip39.wordlists.chinese_simplified
      );
    } else {
      mnemonic = window.MyLibrary.bip39.generateMnemonic(128);
    }

    // 2) 助记词 -> 种子
    const seed = window.MyLibrary.bip39.mnemonicToSeedSync(mnemonic);

    // ========== BTC (Native SegWit) ==========
    const bitcoin = window.MyLibrary.bitcoinjsLib;
    const rootBTC = bitcoin.bip32.fromSeed(seed);

    // BIP84 路径: m/84'/0'/0'/0/0
    const childBTC = rootBTC.derivePath("m/84'/0'/0'/0/0");

    const { address: btcAddr } = bitcoin.payments.p2wpkh({
      pubkey: childBTC.publicKey,
      network: bitcoin.networks.bitcoin, // 如果是测试网，可以改为 bitcoin.networks.testnet
    });

    // ========== BTC 普通地址（P2PKH，m/44'/0'/0'/0/0，1开头） ==========
    const childBTCLegacy = rootBTC.derivePath("m/44'/0'/0'/0/0");
    const { address: btcLegacyAddr } = bitcoin.payments.p2pkh({
      pubkey: childBTCLegacy.publicKey,
      network: bitcoin.networks.bitcoin,
    });

    // ========== ETH ==========
    // 改用 HDNodeWallet.fromSeed
    const ethWallet = window.MyLibrary.ethers.HDNodeWallet.fromSeed(seed);
    const derivedWallet = ethWallet.derivePath("m/44'/60'/0'/0/0");
    const ethAddr = derivedWallet.address;


    // ========== TRON ==========
    const childTRON = ethWallet.derivePath("m/44'/195'/0'/0/0");
    const tronPrivKey = childTRON.privateKey.replace(/^0x/, '');
    const tronWeb = window.MyLibrary.TronWeb;
    const tronAddr = tronWeb.TronWeb.address.fromPrivateKey(tronPrivKey);

    // ========== Solana ==========
    const solanaWeb3 = window.MyLibrary.solanaWeb3;
    const derivePath = window.MyLibrary.derivePath;
    const solanaPath = "m/44'/501'/0'/0'";
    const { key } = derivePath(solanaPath, seed.toString('hex')); // 从种子生成密钥
    const solKeypair = solanaWeb3.Keypair.fromSeed(key.slice(0, 32)); // Ed25519 秘钥需要 32 字节
    const solAddr = solKeypair.publicKey.toBase58(); // 转为 Base58 地址

    // ========== BCH 地址（CashAddr，m/44'/145'/0'/0/0） ==========
    const rootBCH = bitcoin.bip32.fromSeed(seed);
    const childBCH = rootBCH.derivePath("m/44'/145'/0'/0/0");
    const { address: bchLegacyAddr } = bitcoin.payments.p2pkh({
      pubkey: childBCH.publicKey,
      network: {
        messagePrefix: '\x18Bitcoin Signed Message:\n',
        bech32: null,
        bip32: { public: 0x0488b21e, private: 0x0488ade4 },
        pubKeyHash: 0x00,
        scriptHash: 0x05,
        wif: 0x80,
      }
    });

    let bchCashAddr = bchLegacyAddr;
    if (window.MyLibrary.bchaddrjs && typeof window.MyLibrary.bchaddrjs.toCashAddress === 'function') {
      bchCashAddr = window.MyLibrary.bchaddrjs.toCashAddress(bchLegacyAddr);
    }
    bchCashAddr = bchCashAddr.replace(/^bitcoincash:/i, '');
    bchCashAddr = 'bitcoincash:' + bchCashAddr;

    // ========== Sui 地址（m/44'/784'/0'/0'/0'） ==========
    const suiPath = "m/44'/784'/0'/0'/0'";
    const suiSeed = window.MyLibrary.derivePath(suiPath, seed.toString('hex')).key;
    let suiAddr = '';
    if (window.MyLibrary.suiEd25519Keypair && window.MyLibrary.suiEd25519Keypair.fromSecretKey) {
      const suiKeypair = window.MyLibrary.suiEd25519Keypair.fromSecretKey(suiSeed);
      suiAddr = suiKeypair.getPublicKey().toSuiAddress();
    }

    // ========== DOGE 地址（m/44'/3'/0'/0/0） ==========
    const dogeNetwork = {
      messagePrefix: '\x19Dogecoin Signed Message:\n',
      bech32: null,
      bip32: { public: 0x02facafd, private: 0x02fac398 },
      pubKeyHash: 0x1e,
      scriptHash: 0x16,
      wif: 0x9e,
    };
    const rootDOGE = bitcoin.bip32.fromSeed(seed, dogeNetwork);
    const childDOGE = rootDOGE.derivePath("m/44'/3'/0'/0/0");
    const { address: dogeAddr } = bitcoin.payments.p2pkh({
      pubkey: childDOGE.publicKey,
      network: dogeNetwork,
    });

    // 返回结果
    return {
      mnemonic,
      btcLegacyAddr,
      btcAddr,
      bchCashAddr,
      ethAddr,
      tronAddr,
      solAddr,
      suiAddr,
      dogeAddr,
    };
  }

  const bitcoincash = window.MyLibrary.bitcoincashjs;
  const bchaddrjs = window.MyLibrary.bchaddrjs;


  // base64标准编码（非url）
  function toBase64(bytes) {
    // 浏览器环境
    if (typeof window !== 'undefined' && window.btoa) {
      let binary = '';
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    }
    // Node.js
    return Buffer.from(bytes).toString('base64');
  }

  // 生成标准TON地址（如UQ.../EQ...）
  function getTonWalletV4Address(publicKey, wc = 0) {
    // 1. 构造data cell（标准钱包v4R2，seqno=0）
    const dataCell = new Uint8Array(34);
    dataCell[0] = 0;
    dataCell.set(publicKey, 1);
    dataCell[33] = 0;

    // 2. sha256
    // 用js-sha256
    // import { sha256 } from 'js-sha256';
    const { sha256 } = require('js-sha256'); // 或ESM方式
    const dataHash = Uint8Array.from(sha256.array(dataCell));

    // 3. 拼接workchain和hash
    // 标准TON地址格式: tag(0x51) + wc(1字节) + hash(32字节) + crc16(2字节)
    const tag = 0x51; // bounceable, 主网
    const addrBytes = new Uint8Array(1 + 1 + 32);
    addrBytes[0] = tag;
    addrBytes[1] = wc & 0xff;
    addrBytes.set(dataHash, 2);

    // 4. 计算crc16
    function crc16(data) {
      let crc = 0xffff;
      for (let i = 0; i < data.length; i++) {
        crc ^= data[i] << 8;
        for (let j = 0; j < 8; j++) {
          if ((crc & 0x8000) !== 0) {
            crc = (crc << 1) ^ 0x1021;
          } else {
            crc <<= 1;
          }
          crc &= 0xffff;
        }
      }
      return [(crc >> 8) & 0xff, crc & 0xff];
    }
    const checksum = crc16(addrBytes);

    // 5. 拼接最终字节
    const finalBytes = new Uint8Array(addrBytes.length + 2);
    finalBytes.set(addrBytes, 0);
    finalBytes.set(checksum, addrBytes.length);

    // 6. base64编码
    return toBase64(finalBytes);
  }

  function showCopyTipNearBtn(btn, msg) {
    // 先移除已有的
    let oldTip = btn.parentElement.querySelector('.copy-tip');
    if (oldTip) oldTip.remove();
    //o a
    const tip = document.createElement('span');
    tip.className = 'copy-tip';
    tip.textContent = msg;
    tip.style.marginLeft = '8px';
    tip.style.color = '#2563eb';
    tip.style.fontWeight = 'bold';
    btn.parentElement.appendChild(tip);
    setTimeout(() => {
      tip.remove();
    }, 1000);
  }

  // 自动设置年份
  document.getElementById('footerYear').textContent = new Date().getFullYear();
