export const translations = {    en: {
        nav: [{ route: '/', label: 'Choose Role' },
            { route: '/streamer', label: 'Streamer' },
            { route: '/viewer', label: 'Viewer' },
            { route: '/guest', label: 'Play as Guest' }],
        roles: {
            title: 'Choose your role',
            subtitle: 'Decide how you want to experience the Chaos world.',
            cards: [
                {
                    key: 'streamer',
                    route: '/streamer',
                    icon: 'S',
                    title: 'Streamer',
                    description: 'Go live on YouTube while you play and let your viewers bend the rules.',
                    highlights: [
                        'Automatic YouTube broadcast once you sign in.',
                        'Viewers can donate SOL to trigger buffs or spawn events.',
                        'Play with the full game experience plus stream overlays soon.'
                    ],
                    action: 'Play as Streamer'
                },
                {
                    key: 'viewer',
                    route: '/viewer',
                    icon: 'V',
                    title: 'Viewer',
                    description: 'Watch active streamers, back them with SOL donations and change their fate.',
                    highlights: [
                        'Browse who is live right now.',
                        'Donate to trigger buffs, chaos events or map jumps.',
                        'Wallet connection powered by ethers.js (no blockchain yet).'
                    ],
                    action: 'Enter as Viewer'
                },
                {
                    key: 'guest',
                    route: '/guest',
                    icon: 'G',
                    title: 'Guest',
                    description: 'Jump straight into the demo. No account, wallet or streaming setup required.',
                    highlights: [
                        'Instant gameplay access.',
                        'Great for quick playtests.',
                        'Upgrade to streamer or viewer any time.'
                    ],
                    action: 'Play as Guest'
                }
            ],
            note: 'You can switch roles at any time from this menu.',
            emptyState: 'No roles available right now.'
        },
        streamer: {
            intro: 'Sign in with your streamer credentials and keep your audience in sync with your adventure.',
            youtube: {
                heading: 'Link your YouTube channel',
                description: 'Provide your channel URL and stream key so the game can start the broadcast automatically after login.',
                channelLabel: 'Channel URL',
                streamKeyLabel: 'Stream key',
                displayNameLabel: 'Display name',
                activityLabel: 'What are you streaming?',
                tagsLabel: 'Tags',
                tagsHint: 'Comma separated (Chaos, PvE, Speedrun)',
                helper: 'These details live only on your device. Update them whenever you rotate your key.',
                connectCta: 'Link YouTube',
                disconnectCta: 'Unlink channel',
                helpCta: 'How do I find my stream key?',
                helpUrl: 'https://support.google.com/youtube/answer/2474026?hl=en',
                status: {
                    idle: 'No YouTube channel linked yet.',
                    linking: 'Syncing with the Chaos viewer list...',
                    linked: 'Channel linked. Chaos viewers can find you live.',
                    offline: 'Channel unlinked. Viewers will no longer see you.'
                },
                messages: {
                    linkSuccess: 'Channel linked. Chaos viewers can find you live.',
                    linkError: 'Could not link the channel. Check the URL and stream key.',
                    unlinkSuccess: 'Channel removed from the live list.'
                }
            }
        },
        viewer: {
            title: 'Support a live streamer',
            subtitle: 'Pick a channel, watch the action and use SOL donations to influence their run.',
            note: 'Blockchain settlement will arrive later - this UI previews the experience.',
            streamListTitle: 'Live streams',
            emptyState: 'No Chaos streamers are live right now. Check back later!',
            viewerCountLabel: '{count} viewers',
            wallet: {
                title: 'Wallet connection',
                description: 'Use a Solana-compatible wallet with browser support (Phantom, Solflare, Backpack...).',
                connectCta: 'Connect wallet',
                disconnectCta: 'Disconnect',
                connectPrompt: 'Please connect your wallet before donating.',
                connected: 'Wallet connected. You can donate now.',
                disconnected: 'Wallet disconnected.',
                error: 'Could not connect wallet. Please try again.',
                noProvider: 'No Web3 wallet detected in your browser.',
                status: {
                    idle: 'Status: Ready',
                    connecting: 'Status: Connecting...',
                    connected: 'Status: Connected',
                    error: 'Status: Error'
                },
                labels: {
                    address: 'Wallet',
                    network: 'Network',
                    balance: 'Balance'
                }
            },
            donations: {
                heading: 'Donation actions',
                description: 'Choose what happens when your SOL arrives - buff the run or unleash chaos.',
                donateCta: 'Donate {amount} SOL',
                requiresWallet: 'Please connect your wallet before donating.',
                success: 'Request {option} for {streamer} registered. It will trigger once {amount} SOL is received.',
                buffTitle: 'Buff menu',
                eventTitle: 'Chaos events',
                emptyBuffs: 'Buff options will appear here soon.',
                emptyEvents: 'Event options will appear here soon.',
                buffOptions: [
                    {
                        id: 'buff-attack',
                        label: 'Blessing of Might',
                        amount: '0.25',
                        description: 'Boost attack damage by 30% for 60 seconds.'
                    },
                    {
                        id: 'buff-speed',
                        label: 'Haste Surge',
                        amount: '0.18',
                        description: 'Increase movement speed by 40% for 45 seconds.'
                    },
                    {
                        id: 'buff-shield',
                        label: 'Aurora Shield',
                        amount: '0.22',
                        description: 'Grant a protective barrier that absorbs heavy damage.'
                    }
                ],
                eventOptions: [
                    {
                        id: 'event-boss',
                        label: 'Spawn elite hunt',
                        amount: '0.50',
                        description: 'Summon an elite monster pack near the streamer.'
                    },
                    {
                        id: 'event-chaos',
                        label: 'Chaos portal',
                        amount: '0.35',
                        description: 'Open a rift that throws extra enemies into the current map.'
                    },
                    {
                        id: 'event-relocate',
                        label: 'Map shift',
                        amount: '0.40',
                        description: 'Teleport the streamer to a surprise location.'
                    }
                ]
            },
            streamers: [],
        },
        disclaimer: [
            'Disclaimer: Chaos is not just a game, is a platform to create games.',
            'This is a demo to show how many features are available on the platform.'
        ],
        guest: {
            title: 'Play as a Guest',
            usernameLabel: 'Username',
            submit: 'Play',
            loadingAlt: 'Loading...'
        },
        register: {
            title: 'Create Account',
            emailLabel: 'Email',
            usernameLabel: 'Username',
            passwordLabel: 'Password',
            rePasswordLabel: 'Re-type password',
            termsLink: 'Accept our Terms and Conditions (click here).',
            submit: 'Register',
            loadingAlt: 'Loading...'
        },
        login: {
            title: 'Login',
            usernameLabel: 'Username',
            passwordLabel: 'Password',
            submit: 'Submit',
            loadingAlt: 'Loading...',
            signupLink: 'Create an account',
            forgotLink: 'Forgot password?'
        },
        forgot: {
            title: 'Forgot password',
            emailLabel: 'Email',
            submit: 'Request',
            loadingAlt: 'Loading...'
        },
        firebase: {
            title: 'Firebase Registration',
            usernameLabel: 'Username',
            loadingAlt: 'Loading...'
        },
        terms: {
            heading: 'Terms and conditions',
            acceptLabel: 'I agree to these Terms and Conditions'
        },
        instructions: {
            heading: 'Instructions',
            steps: [
                'Move with the arrows or using W-A-S-D.',
                'Use left click to follow a path but for now to change to another scene you need to walk through the change point (like the bridge at the top, or the houses doors).',
                'Use right-click or TAB to target near enemies or players.',
                'You must have a target to execute a skill/action.',
                'Use the screen-buttons to activate the different player skills/actions.'
            ]
        },
        gameOver: [
            'You died!',
            'Just wait...',
            'You will be automatically revived for this demo!'
        ],
        playerInfo: {
            classHint: 'Pick the class path you want to try.',
            createHint: 'Name must be unique. Only letters and numbers are allowed.'
        },
        playerSelection: {
            selectLabel: 'Select Player',
            selectSubmit: 'Start',
            createTitle: 'Create Player',
            createNameLabel: 'Player Name',
            createSubmit: 'Create & Start',
            loadingAlt: 'Loading...'
        },
        playerCreation: {
            loadingAlt: 'Loading...'
        },
        footer: 'by DwDeveloper'
    },    es: {
        playerInfo: {
            classHint: 'Elige la clase que quieras probar.',
            createHint: 'El nombre debe ser unico. Solo letras y numeros.'
        },
        nav: [{ route: '/', label: 'Elegir rol' },
            { route: '/streamer', label: 'Streamer' },
            { route: '/viewer', label: 'Espectador' },
            { route: '/guest', label: 'Invitado' }],
        roles: {
            title: 'Elige tu rol',
            subtitle: 'Decide como quieres vivir el mundo de Chaos.',
            cards: [
                {
                    key: 'streamer',
                    route: '/streamer',
                    icon: 'S',
                    title: 'Streamer',
                    description: 'Transmite en YouTube mientras juegas y deja que tu comunidad cambie la partida.',
                    highlights: [
                        'Transmision automatica en YouTube tras iniciar sesion.',
                        'Los espectadores pueden donar SOL para activar buffs o eventos.',
                        'Juega con toda la experiencia del juego mas herramientas para stream.'
                    ],
                    action: 'Jugar como Streamer'
                },
                {
                    key: 'viewer',
                    route: '/viewer',
                    icon: 'V',
                    title: 'Espectador',
                    description: 'Observa a los streamers activos, dales SOL y cambia su destino.',
                    highlights: [
                        'Explora quien esta en vivo ahora mismo.',
                        'Dona para activar buffs, eventos o cambios de mapa.',
                        'Conexion de wallet usando ethers.js (blockchain pronto).'
                    ],
                    action: 'Entrar como Espectador'
                },
                {
                    key: 'guest',
                    route: '/guest',
                    icon: 'G',
                    title: 'Invitado',
                    description: 'Entra directo al demo sin crear cuenta ni configurar nada.',
                    highlights: [
                        'Acceso inmediato al juego.',
                        'Ideal para probar rapidamente.',
                        'Cambia a streamer o espectador cuando quieras.'
                    ],
                    action: 'Jugar como Invitado'
                }
            ],
            note: 'Puedes cambiar de rol en cualquier momento desde este menu.',
            emptyState: 'No hay roles disponibles por ahora.'
        },
        streamer: {
            intro: 'Inicia sesion con tu cuenta de streamer y manten a tu audiencia al dia con tu aventura.',
            youtube: {
                heading: 'Vincula tu canal de YouTube',
                description: 'Indica la URL del canal y tu stream key para iniciar la transmision automaticamente despues del login.',
                channelLabel: 'URL del canal',
                streamKeyLabel: 'Stream key',
                displayNameLabel: 'Nombre visible',
                activityLabel: 'Que estas transmitiendo?',
                tagsLabel: 'Etiquetas',
                tagsHint: 'Separa con comas (Chaos, PvE, Speedrun)',
                helper: 'Estos datos quedan en tu dispositivo. Actualizalos cuando cambies la clave.',
                connectCta: 'Vincular YouTube',
                disconnectCta: 'Desvincular canal',
                helpCta: 'Como encuentro mi stream key?',
                helpUrl: 'https://support.google.com/youtube/answer/2474026?hl=es',
                status: {
                    idle: 'Todavia no vinculaste ningun canal.',
                    linking: 'Sincronizando con la lista de Chaos...',
                    linked: 'Canal listo. Los viewers de Chaos pueden encontrarte en vivo.',
                    offline: 'Canal desvinculado. Los viewers ya no te veran.'
                },
                messages: {
                    linkSuccess: 'Canal vinculado. Los viewers de Chaos pueden encontrarte en vivo.',
                    linkError: 'No pudimos vincular el canal. Verifica la URL y el stream key.',
                    unlinkSuccess: 'Canal eliminado de la lista en vivo.'
                }
            }
        },
        viewer: {
            title: 'Apoya a un streamer en vivo',
            subtitle: 'Elige un canal, mira la accion y usa donaciones en SOL para influir.',
            note: 'La capa blockchain llegara mas adelante - por ahora es una vista previa.',
            streamListTitle: 'Streams en vivo',
            emptyState: 'No hay canales de Chaos en vivo por ahora. Vuelve pronto!',
            viewerCountLabel: '{count} espectadores',
            wallet: {
                title: 'Conexion de wallet',
                description: 'Usa una wallet compatible con Solana y navegador (Phantom, Solflare, Backpack...).',
                connectCta: 'Conectar wallet',
                disconnectCta: 'Desconectar',
                connectPrompt: 'Conecta tu wallet antes de donar.',
                connected: 'Wallet conectada. Ya puedes donar.',
                disconnected: 'Wallet desconectada.',
                error: 'No se pudo conectar la wallet. Intenta otra vez.',
                noProvider: 'No detectamos una wallet Web3 en el navegador.',
                status: {
                    idle: 'Estado: Listo',
                    connecting: 'Estado: Conectando...',
                    connected: 'Estado: Conectado',
                    error: 'Estado: Error'
                },
                labels: {
                    address: 'Wallet',
                    network: 'Red',
                    balance: 'Saldo'
                }
            },
            donations: {
                heading: 'Acciones de donacion',
                description: 'Elige que ocurre cuando llegue tu SOL - buffs o caos.',
                donateCta: 'Donar {amount} SOL',
                requiresWallet: 'Conecta tu wallet antes de donar.',
                success: 'Pedido {option} para {streamer} registrado. Se activara al recibir {amount} SOL.',
                buffTitle: 'Buffs',
                eventTitle: 'Eventos',
                emptyBuffs: 'Pronto agregaremos buffs aqui.',
                emptyEvents: 'Pronto agregaremos eventos aqui.',
                buffOptions: [
                    {
                        id: 'buff-attack',
                        label: 'Bendicion de Poder',
                        amount: '0.25',
                        description: 'Aumenta el dano 30% por 60 segundos.'
                    },
                    {
                        id: 'buff-speed',
                        label: 'Impulso de Velocidad',
                        amount: '0.18',
                        description: 'Sube la velocidad 40% por 45 segundos.'
                    },
                    {
                        id: 'buff-shield',
                        label: 'Escudo Aurora',
                        amount: '0.22',
                        description: 'Genera una barrera que absorbe gran dano.'
                    }
                ],
                eventOptions: [
                    {
                        id: 'event-boss',
                        label: 'Caceria elite',
                        amount: '0.50',
                        description: 'Invoca un grupo de monstruos elite cerca del streamer.'
                    },
                    {
                        id: 'event-chaos',
                        label: 'Portal del caos',
                        amount: '0.35',
                        description: 'Abre una grieta que trae enemigos extra al mapa.'
                    },
                    {
                        id: 'event-relocate',
                        label: 'Cambio de mapa',
                        amount: '0.40',
                        description: 'Teletransporta al streamer a otro sitio sorpresa.'
                    }
                ]
            },
            streamers: [],
        },
        disclaimer: [
            'Descargo: Chaos no es solo un juego, es una plataforma para crear juegos.',
            'Esta es una demostracion para mostrar cuantas funciones estan disponibles en la plataforma.'
        ],
        guest: {
            title: 'Jugar como invitado',
            usernameLabel: 'Nombre de usuario',
            submit: 'Jugar',
            loadingAlt: 'Cargando...'
        },
        register: {
            title: 'Crear Cuenta',
            emailLabel: 'Email',
            usernameLabel: 'Nombre de Usuario',
            passwordLabel: 'Contrasena',
            rePasswordLabel: 'Reescribe contrasena',
            termsLink: 'Acepta nuestros Terminos y Condiciones (haz clic aqui).',
            submit: 'Registrarse',
            loadingAlt: 'Cargando...'
        },
        login: {
            title: 'Login',
            usernameLabel: 'Nombre de Usuario',
            passwordLabel: 'Password',
            submit: 'Entrar',
            loadingAlt: 'Cargando...',
            signupLink: 'Crear cuenta',
            forgotLink: 'Recuperar acceso'
        },
        forgot: {
            title: 'Olvide mi contrasena',
            emailLabel: 'Email',
            submit: 'Solicitar',
            loadingAlt: 'Cargando...'
        },
        firebase: {
            title: 'Firebase Login',
            usernameLabel: 'Usuario',
            loadingAlt: 'Cargando...'
        },
        terms: {
            heading: 'Terminos y Condiciones',
            acceptLabel: 'Acepto estos Terminos y Condiciones'
        },
        instructions: {
            heading: 'Instrucciones',
            steps: [
                'Muevete con las flechas o usando W-A-S-D.',
                'Utiliza el clic izquierdo para seguir un camino, pero por ahora, para cambiar a otra escena, debes atravesar el punto de cambio (como el puente en la parte superior o las puertas de las casas).',
                'Utiliza clic derecho o TAB para apuntar a enemigos o jugadores cercanos.',
                'Debes tener un objetivo para ejecutar una habilidad/accion.',
                'Utiliza los botones en pantalla para activar las diferentes habilidades/acciones del jugador.'
            ]
        },
        gameOver: [
            'Moriste!',
            'Solo espera...',
            'Seras revivido automaticamente para esta demostracion!'
        ],
        playerSelection: {
            selectLabel: 'Seleccionar Personaje',
            selectSubmit: 'Iniciar',
            createTitle: 'Crear Personaje',
            createNameLabel: 'Nombre',
            createSubmit: 'Crear y comenzar',
            loadingAlt: 'Cargando...'
        },
        playerCreation: {
            loadingAlt: 'Cargando...'
        },
        footer: 'by DwDeveloper'
    },    vi: {
        playerInfo: {
            classHint: 'Chon class path ban muon thu.',
            createHint: 'Ten phai duy nhat, chi chu va so.'
        },
        nav: [{ route: '/', label: 'Chon vai tro' },
            { route: '/streamer', label: 'Streamer' },
            { route: '/viewer', label: 'Viewer' },
            { route: '/guest', label: 'Khach' }],
        roles: {
            title: 'Chon vai tro cua ban',
            subtitle: 'Quyet inh cach ban trai nghiem the gioi Chaos.',
            cards: [
                {
                    key: 'streamer',
                    route: '/streamer',
                    icon: 'S',
                    title: 'Streamer',
                    description: 'Phat truc tiep len YouTube khi choi va e cong ong tac ong toi hanh trinh.',
                    highlights: [
                        'Tu ong phat truc tiep tren YouTube sau khi ang nhap.',
                        'Viewer co the donate SOL e kich hoat buff hoac su kien.',
                        'Van choi ay u tinh nang, sap co them cong cu stream.'
                    ],
                    action: 'Choi voi vai tro Streamer'
                },
                {
                    key: 'viewer',
                    route: '/viewer',
                    icon: 'V',
                    title: 'Viewer',
                    description: 'Xem stream dang hoat dong, donate SOL va thay doi ket qua.',
                    highlights: [
                        'Danh sach streamer dang online.',
                        'Donate de kich hoat buff, su kien hoac chuyen map.',
                        'Ket noi vi qua ethers.js (chua kich hoat blockchain).'
                    ],
                    action: 'Tham gia voi vai tro Viewer'
                },
                {
                    key: 'guest',
                    route: '/guest',
                    icon: 'G',
                    title: 'Khach',
                    description: 'Vao game ngay khong can tai khoan hay vi.',
                    highlights: [
                        'Trai nghiem nhanh chong.',
                        'Phu hop de test nhanh.',
                        'Co the chuyen sang streamer hoac viewer bat ky luc nao.'
                    ],
                    action: 'Choi ngay'
                }
            ],
            note: 'Ban co the doi vai tro bat cu luc nao o man hinh nay.',
            emptyState: 'Hien chua co vai tro nao kha dung.'
        },
        streamer: {
            intro: 'Dang nhap bang tai khoan streamer de vua choi vua livestream cho cong dong.',
            youtube: {
                heading: 'Lien ket kenh YouTube',
                description: 'Nhap URL kenh va stream key de game tu khoi chay livestream sau khi dang nhap.',
                channelLabel: 'URL kenh',
                streamKeyLabel: 'Stream key',
                displayNameLabel: 'Ten hien thi',
                activityLabel: 'Ban dang stream gi?',
                tagsLabel: 'Nhan',
                tagsHint: 'Phan tach bang dau phay (Chaos, PvE, Speedrun)',
                helper: 'Thong tin chi luu cuc bo tren may cua ban. Hay cap nhat khi thay key.',
                connectCta: 'Lien ket YouTube',
                disconnectCta: 'Huy lien ket kenh',
                helpCta: 'Xem stream key o dau?',
                helpUrl: 'https://support.google.com/youtube/answer/2474026?hl=vi',
                status: {
                    idle: 'Chua lien ket kenh YouTube.',
                    linking: 'Dang dong bo voi danh sach Chaos...',
                    linked: 'Da lien ket. Viewer Chaos co the tim thay ban.',
                    offline: 'Da huy lien ket. Viewer se khong thay ban nua.'
                },
                messages: {
                    linkSuccess: 'Da lien ket. Viewer Chaos co the tim thay ban.',
                    linkError: 'Khong the lien ket kenh. Kiem tra lai URL va stream key.',
                    unlinkSuccess: 'Da xoa kenh khoi danh sach dang live.'
                }
            }
        },
        viewer: {
            title: 'Ung ho streamer dang live',
            subtitle: 'Chon kenh, theo doi va dung SOL de tac dong den tran dau.',
            note: 'Layer blockchain se duoc bo sung sau - giao dien nay chi la buoc chuan bi.',
            streamListTitle: 'Danh sach stream truc tiep',
            emptyState: 'Chua co streamer Chaos nao dang live. Hay quay lai sau!',
            viewerCountLabel: '{count} nguoi xem',
            wallet: {
                title: 'Ket noi vi',
                description: 'Su dung vi ho tro Solana tren trinh duyet (Phantom, Solflare, Backpack...).',
                connectCta: 'Ket noi vi',
                disconnectCta: 'Ngat ket noi',
                connectPrompt: 'Hay ket noi vi truoc khi donate.',
                connected: 'Da ket noi vi. Ban co the donate.',
                disconnected: 'Da ngat ket noi vi.',
                error: 'Khong the ket noi vi. Vui long thu lai.',
                noProvider: 'Khong phat hien vi Web3 tren trinh duyet.',
                status: {
                    idle: 'Trang thai: San sang',
                    connecting: 'Trang thai: dang ket noi...',
                    connected: 'Trang thai: da ket noi',
                    error: 'Trang thai: Loi'
                },
                labels: {
                    address: 'Dia chi',
                    network: 'Mang',
                    balance: 'So du'
                }
            },
            donations: {
                heading: 'Tuy chon donate',
                description: 'Chon hanh dong se xay ra khi SOL cua ban duoc nhan.',
                donateCta: 'Donate {amount} SOL',
                requiresWallet: 'Vui long ket noi vi truoc khi donate.',
                success: 'Yeu cau {option} cho {streamer} da duoc ghi nhan. Se kich hoat khi nhan {amount} SOL.',
                buffTitle: 'Buff ho tro',
                eventTitle: 'Su kien hon loan',
                emptyBuffs: 'Buff se som xuat hien tai day.',
                emptyEvents: 'Su kien se som xuat hien tai day.',
                buffOptions: [
                    {
                        id: 'buff-attack',
                        label: 'Chuc phuc Suc manh',
                        amount: '0.25',
                        description: 'Tang sat thuong 30% trong 60 giay.'
                    },
                    {
                        id: 'buff-speed',
                        label: 'Tang toc',
                        amount: '0.18',
                        description: 'Tang toc chay 40% trong 45 giay.'
                    },
                    {
                        id: 'buff-shield',
                        label: 'Khien Aurora',
                        amount: '0.22',
                        description: 'Tao la chan hap thu sat thuong lon.'
                    }
                ],
                eventOptions: [
                    {
                        id: 'event-boss',
                        label: 'Trieu hoi quai tinh anh',
                        amount: '0.50',
                        description: 'Trieu hoi bay quai tinh anh gan streamer.'
                    },
                    {
                        id: 'event-chaos',
                        label: 'Cong hon loan',
                        amount: '0.35',
                        description: 'Mo cong ua them quai vao ban o hien tai.'
                    },
                    {
                        id: 'event-relocate',
                        label: 'Dich chuyen ngau nhien',
                        amount: '0.40',
                        description: 'ua streamer en vi tri bat ngo.'
                    }
                ]
            },
            streamers: [],
        },
        disclaimer: [
            'Luu y: Chaos khong chi la mot tro choi, day la nen tang de tao ra cac tro choi.',
            'Ban demo nay giup ban kham pha so luong tinh nang co san tren nen tang.'
        ],
        guest: {
            title: 'Choi voi tu cach Khach',
            usernameLabel: 'Ten nguoi choi',
            submit: 'Bat dau',
            loadingAlt: 'Dang tai...'
        },
        register: {
            title: 'Tao tai khoan',
            emailLabel: 'Email',
            usernameLabel: 'Ten nguoi dung',
            passwordLabel: 'Mat khau',
            rePasswordLabel: 'Nhap lai mat khau',
            termsLink: 'Dong y Dieu khoan & Dieu kien (bam vao day).',
            submit: 'Dang ky',
            loadingAlt: 'Dang tai...'
        },
        login: {
            title: 'Dang nhap',
            usernameLabel: 'Ten nguoi dung',
            passwordLabel: 'Mat khau',
            submit: 'Xac nhan',
            loadingAlt: 'Dang tai...',
            signupLink: 'Tao tai khoan',
            forgotLink: 'Quen mat khau?'
        },
        forgot: {
            title: 'Quen mat khau',
            emailLabel: 'Email',
            submit: 'Gui yeu cau',
            loadingAlt: 'Dang tai...'
        },
        firebase: {
            title: 'Dang ky qua Firebase',
            usernameLabel: 'Ten nguoi dung',
            loadingAlt: 'Dang tai...'
        },
        terms: {
            heading: 'Dieu khoan & Dieu kien',
            acceptLabel: 'Toi dong y voi Dieu khoan & Dieu kien nay'
        },
        instructions: {
            heading: 'Huong dan',
            steps: [
                'Di chuyen bang cac phim mui ten hoac W-A-S-D.',
                'Nhan chuot trai de tu dong di chuyen, muon doi canh hay di qua diem doi canh (vi du cay cau phia tren hoac cua nha).',
                'Nhan chuot phai hoac phim TAB de chon ke dich hoac nguoi choi gan ban.',
                'Ban can co muc tieu de thi trien ky nang/hanh dong.',
                'Su dung cac nut tren man hinh de kich hoat ky nang/hanh dong.'
            ]
        },
        gameOver: [
            'Ban da guc nga!',
            'Hay cho mot chut...',
            'Ban se duoc hoi sinh tu dong trong ban demo nay!'
        ],
        playerSelection: {
            selectLabel: 'Chon nhan vat',
            selectSubmit: 'Bat dau',
            createTitle: 'Tao nhan vat',
            createNameLabel: 'Ten nhan vat',
            createSubmit: 'Tao va choi',
            loadingAlt: 'Dang tai...'
        },
        playerCreation: {
            loadingAlt: 'Dang tai...'
        },
        footer: 'by DwDeveloper'
    }
};










