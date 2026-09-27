# Publishing LEVEL 256 on Steam

This guide covers the desktop build in `desktop/`, uploading it to Steam, and the store page. The same game
also runs in any browser from the repository root.

## Kısa kontrol listesi (Türkçe)

1. **Steamworks hesabı:** partner.steamgames.com üzerinden Steam Direct ücretini (100 $) öde, vergi ve banka
   bilgilerini gir. Uygulama kimliğini (App ID) ve iki depo kimliğini (Windows, Linux) not al.
2. **Derle:** Node.js 20 veya üstü kurulu bir bilgisayarda:
   ```
   cd desktop
   npm ci
   npm run dist:win      # dist/win-unpacked/LEVEL 256.exe
   npm run dist:linux    # dist/linux-unpacked/level256  (Linux / Steam Deck)
   ```
3. **Dene:** `npm start` oyunu açar (internet gerekmez). `npm run smoke` otomatik kontrolü çalıştırır.
   Tamamen çevrimdışı çalışmalı: interneti kapatıp dene.
4. **Yükle:** `desktop/steam/*.vdf` dosyalarındaki `0000000` / `0000001` / `0000002` numaralarını kendi App ID
   ve depo kimliklerinle değiştir, sonra SteamCMD ile:
   `steamcmd +login <kullanıcı> +run_app_build "<tam yol>/desktop/steam/app_build.vdf" +quit`
5. **Başlatma seçenekleri (Steamworks → Installation → General):**
   - Windows: `LEVEL 256.exe`
   - Linux: `level256`, argüman `--no-sandbox`
6. **Mağaza sayfası:** aşağıdaki "Store page" bölümündeki metinler, içerik anketi cevapları, sistem gereksinimleri
   ve görsel boyutları hazır. Ekran kartı olan bilgisayarında `npm run steam-art` çalıştır: oyun her bölümden
   arayüzsüz 1920×1080 ekran görüntüleri ve Steam'in istediği bütün kapsül görsellerini (logo ile) üretir,
   hepsi `desktop/steam-art/` klasörüne düşer. En iyilerini seç.
7. **İnceleme:** Steam, mağaza sayfasını ve derlemeyi ayrı ayrı inceler (birkaç iş günü). Sayfa "Coming Soon"
   olarak en az 2 hafta açık kalmalı; sonra "Release" düğmesiyle yayınla.

## The desktop build

`desktop/` wraps the game in [Electron](https://www.electronjs.org). The game code is not changed for it:

- `scripts/vendor.js` copies `index.html`, `css/` and `js/` into `desktop/app/`, together with local copies of
  everything the web version downloads: three.js r170, cannon-es 0.20.0 and the 26 web font families (woff2 files
  from the `@fontsource` packages). It also writes `THIRD_PARTY_NOTICES.txt`, which is shipped next to the
  executable.
- `main.js` serves the game from `app://level256/`. It answers the game's requests for the CDN files and Google
  Fonts from those local copies and refuses every other network request. The game runs fully offline and sends
  nothing anywhere. It also:
  - starts fullscreen and remembers the choice. F11 and Alt+Enter toggle it.
  - applies the V-Sync setting through Chromium's start-up switches. Changing it in the game shows
    **Restart now**.
  - enables pointer lock and fullscreen, denies every other permission, and opens external links in the
    player's browser.
  - sends process metrics to the performance overlay: system CPU, the game's own CPU share and its memory.
- `preload.js` gives the page `window.LEVEL256_NATIVE`: `quit`, `restart`, `setFullscreen`, `setVsync` and
  `metrics`. When it is present, the main menu shows **Quit game**.

Saves and settings live in the Electron profile: `%APPDATA%\LEVEL 256` on Windows and `~/.config/LEVEL 256` on
Linux. To have Steam Cloud keep them, add that folder under Steamworks → Cloud → Auto-Cloud:

- Root `WinAppDataRoaming`, subdirectory `LEVEL 256/Local Storage`, pattern `*`, platform Windows.
- Root `LinuxXdgConfigHome`, same subdirectory, platform Linux.

### Commands

| Command | What it does |
| --- | --- |
| `npm ci` | Installs Electron, electron-builder, three.js, cannon-es and the fonts at the pinned versions |
| `npm start` | Rebuilds `app/` and starts the game |
| `npm run smoke` | Starts the real app with a throwaway profile. It checks that the game boots, three.js, physics and the fonts load locally, the native API works and the first chapter plays. Screenshots go to `smoke-out/`. Without a display or GPU: `xvfb-run node scripts/smoke.js --software` |
| `npm run dist:win` | Builds `dist/win-unpacked/` (x64), the folder that goes into the Windows depot |
| `npm run dist:linux` | Builds `dist/linux-unpacked/`, the folder that goes into the Linux / SteamOS depot |
| `npm run steam-art` | Renders store art from the game itself (use a PC with a real graphics card). Every chapter gives clean 1920 × 1080 screenshots without the HUD, one of them facing a creature. It also makes every capsule size with the logo, the 3840 × 1240 library hero and the transparent library logo, all in `steam-art/`. Options: `--levels prolog,pool --preset high` |
| `npm run dist:mac` | Builds a universal macOS app (run on a Mac; sign and notarize it with an Apple Developer ID) |

A Windows build can be made on Windows, or on Linux with Wine installed. Build each platform on its own
operating system if possible.

### Command-line options

These can be set as Steam launch options:

- `--windowed`: start in a window this time.
- `--no-vsync`: start without V-Sync regardless of the setting.
- `--steam-overlay` (Windows): moves the GPU work into the main process so the Steam overlay (Shift+Tab) can
  draw on top of the game. Offer it as a second launch option, "Play with Steam overlay".
- `--no-sandbox` (Linux): needed inside the Steam Linux Runtime container, which does not allow Chromium's
  sandbox helper. The game only loads its own files and makes no network requests.

## Uploading with SteamPipe

1. In Steamworks, create the app, then under **SteamPipe → Depots** add a Windows depot and a Linux depot.
2. Replace the ids in `desktop/steam/app_build.vdf`, `depot_windows.vdf` and `depot_linux.vdf`.
3. Build both platforms (`dist/win-unpacked` and `dist/linux-unpacked` must exist), then run:
   `steamcmd +login <build account> +run_app_build "<absolute path>/desktop/steam/app_build.vdf" +quit`
4. In **SteamPipe → Builds**, set the new build live on a private beta branch first. Test it through the Steam
   client on Windows and on a Steam Deck or Linux machine, then set it live on `default`.
5. Under **Installation → General**, add the launch options:
   - Windows: executable `LEVEL 256.exe`. A second option can add `--steam-overlay`.
   - Linux: executable `level256`, arguments `--no-sandbox`.
6. Under **Installation → Redistributables**, nothing is needed. Electron brings its own runtime.

## Store page

**Name:** LEVEL 256: The Starlight Arcade

**Short description (up to 300 characters):**
> November 1994. Seven years after four kids vanished inside the Starlight Arcade, the one who went home early
> lets themself in. Cabinet #7 is still running, unplugged, asking PLAYER 1 to CONTINUE. A first-person
> story horror game about guilt, friendship and a game that never ended.

**Genres and tags:** Horror, Psychological Horror, Adventure, Story Rich, First-Person, Exploration,
Atmospheric, Walking Simulator, Survival Horror, 1990s, Retro, Multiple Endings, Singleplayer.

**Languages (interface and subtitles; there is no voice acting):** English, Turkish, German, French, Spanish
(Spain), Italian, Portuguese (Brazil), Polish, Russian, Simplified Chinese, Japanese, Korean, Arabic.

**Content survey (Mature Content):** Tick *General Mature Content*. Suggested description:
> Horror themes, jump scares, frightening creatures, and themes of missing children, grief and death.
> There is no blood or gore, no sexual content and no real-world gambling.

Leave the other categories unticked: frequent violence or gore, adult-only sexual content, nudity and
gambling. The game has no multiplayer, no user-generated content, no in-game purchases and no data
collection. For age ratings, answer the IARC questionnaire in Steamworks (free). With the answers above,
expect roughly PEGI 12–16, USK 12–16 and ESRB Teen.

**Controller support:** full. Every action and every menu works with a controller in the Xbox layout,
and Steam Input maps PlayStation, Switch and Steam Deck controls to it. Tick "Full controller support" in
Steamworks and choose the Gamepad template as the default Steam Input configuration. On Steam Deck the Linux
depot runs natively. Test it on a Deck before you apply for "Deck Verified".

**Accessibility (store page and settings):** subtitles, optional sound captions, subtitle size, three
difficulties, jump-scare intensity, reduced flicker, head-bob and camera-shake sliders, and a colour-grade
and brightness control.

**System requirements (suggested)**

| | Minimum | Recommended |
| --- | --- | --- |
| OS | Windows 10 64-bit, SteamOS, Ubuntu 22.04 | Windows 11 64-bit |
| Processor | 4 cores, 2.5 GHz | 6 cores, 3.5 GHz |
| Memory | 8 GB RAM | 16 GB RAM |
| Graphics | WebGL 2 capable GPU with 2 GB (GTX 1050 / RX 560 / Intel Iris Xe), Low preset | GTX 1660 / RX 5600 or better, High preset; RTX 3070 or better for Ultra+ |
| Storage | 600 MB | 600 MB |

Use the performance overlay (Settings → Performance) on real hardware to confirm these before you publish.

**Images Steam asks for** (PNG or JPG; the text on capsules must be the game's logo only):

| Asset | Size |
| --- | --- |
| Header capsule | 920 × 430 |
| Small capsule | 462 × 174 |
| Main capsule | 1232 × 706 |
| Vertical capsule | 748 × 896 |
| Library capsule | 600 × 900 |
| Library header | 920 × 430 |
| Library hero | 3840 × 1240 (no text) |
| Library logo | 1280 × 720, transparent PNG |
| Screenshots | at least 5, 1920 × 1080, gameplay only |
| Trailer | recommended, 1080p |

`npm run steam-art` makes all of these except the trailer. Treat them as a starting point: pick the
strongest frames, and consider commissioning key art for the capsules.

The app icon is in `desktop/build/icon.png`. Steamworks → Community asks for a 184 × 184 icon, which can be
cut from it.

## Rights and licences

Everything in the game is original: the story, characters, levels, the in-world arcade game *Hungry House*,
all textures (generated in code), models, sounds and music (synthesized at load time). Arcade cabinet
titles, posters and brand names in the story are invented. Real products are named with generic words
("tape player", "instant photo"). Nothing depends on another game's characters or trademarks.

Third-party components, all under licences that allow commercial use:

| Component | Licence | Notes |
| --- | --- | --- |
| three.js 0.170.0 | MIT | 3D engine |
| cannon-es 0.20.0 | MIT | physics |
| Electron (with Chromium) | MIT; Chromium's licences in `LICENSES.chromium.html` | desktop runtime, shipped next to the executable |
| 26 font families (Press Start 2P, VT323, Caveat, Courier Prime, Kalam, Patrick Hand, Mali, Sriracha, Pixelify Sans, Neucha, PT Mono, Noto Sans SC, ZCOOL QingKe HuangYou, Long Cang, ZCOOL KuaiLe, DotGothic16, Yomogi, Klee One, Nanum Gothic Coding, Do Hyeon, Nanum Pen Script, Gaegu, Noto Kufi Arabic, Reem Kufi, Aref Ruqaa, Noto Naskh Arabic) | SIL Open Font License 1.1 | fonts may be bundled and sold with software; they must not be sold on their own |

`THIRD_PARTY_NOTICES.txt` next to the executable carries the full text of every licence. That meets the MIT
and OFL condition that the notices travel with the software. Mention it in the store page's legal line, for
example: "Uses three.js, cannon-es, Electron and open-licensed fonts; see THIRD_PARTY_NOTICES.txt."

Before you release, choose the game's own licence and copyright holder. `desktop/package.json` has a
placeholder `copyright` line.
