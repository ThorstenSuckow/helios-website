import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  docLink: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'helios::ecs',
    docLink: '/docs/modules/helios-ecs',
    description: (
      <>
        Generic ECS primitives for handles, sparse-set storage, lifecycle hooks,
        and typed entity/component queries.
      </>
    ),
  },
  {
    title: 'helios::engine',
    docLink: '/docs/modules/helios-engine',
    description: (
      <>
        Runtime foundation and integration layer for the modular helios stack,
        including package-based CMake consumption.
      </>
    ),
  },
  {
    title: 'helios::math',
    docLink: '/docs/modules/helios-math',
    description: (
      <>
        Core math library for vectors, matrices, transforms, and projection-related
        operations used across modules.
      </>
    ),
  },
  {
    title: 'helios::opengl',
    docLink: '/docs/modules/helios-opengl',
    description: (
      <>
        OpenGL rendering backend module for graphics pipeline integration in the
        current helios architecture.
      </>
    ),
  },
  {
    title: 'helios::glfw',
    docLink: '/docs/modules/helios-glfw',
    description: (
      <>
        GLFW-based platform backend for window and event integration, aligned with
        the modular repository setup.
      </>
    ),
  },
  {
    title: 'helios::imgui',
    docLink: '/docs/modules/helios-imgui',
    description: (
      <>
        Dear ImGui integration for debug overlays, diagnostics widgets, and
        developer UI on top of the GLFW/OpenGL stack.
      </>
    ),
  },
];

function Feature({title, docLink, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">
          <Link to={docLink}>{title}</Link>
        </Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
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
