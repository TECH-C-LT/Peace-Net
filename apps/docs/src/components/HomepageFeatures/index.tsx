import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'インターネットを平和に✌️',
    Svg: require('@site/static/img/peace.svg').default,
    description: (
      <>
        より安全で平和なインターネット空間の実現を目指し、AIを活用したテキスト判定システムです。
      </>
    ),
  },
  {
    title: '最新モデルを使用して誹謗中傷を判断🧠',
    Svg: require('@site/static/img/ai.svg').default,
    description: (
      <>
        OpenAIの最新モデル、<code>gpt-4o-mini</code><br/>を使用し柔軟な判断を行います。
      </>
    ),
  },
  {
    title: 'Coming soon 🚀',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        素敵な機能を実装予定です✨
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
