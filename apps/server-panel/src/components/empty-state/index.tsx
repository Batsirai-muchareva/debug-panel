import styles from './empty-state.module.scss';

const CODE_LINES = [
    { num: 1, text: '$data = get_posts();' },
    { num: 2, text: '$count = count( $data );' },
    { num: 3, text: 'dp( $data );', highlight: true },
];

export function EmptyState() {
    return (
        <div className={styles.container}>
            <div className={styles.glow} />

            <div className={styles.icon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M8 6L4 12l4 6M16 6l4 6-4 6M12 4l-2 16"
                        stroke="#4ecdc4"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            <div className={styles.text}>
                <p className={styles.heading}>No Debug Output Yet</p>
                <p className={styles.subheading}>
                    Call <code className={styles.code}>dp()</code> anywhere in your PHP code to send data here
                </p>
            </div>

            <div className={styles.snippet}>
                <div className={styles.snippetHeader}>
                    <span className={styles.snippetLabel}>Example</span>
                    <div className={styles.trafficLights}>
                        <span className={styles.red} />
                        <span className={styles.yellow} />
                        <span className={styles.green} />
                    </div>
                </div>
                <div className={styles.snippetBody}>
                    {CODE_LINES.map(({ num, text, highlight }) => (
                        <div key={num} className={styles.codeLine}>
                            <span className={styles.lineNum}>{num}</span>
                            <span className={highlight ? styles.codeHighlight : styles.codeText}>
                                {text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
