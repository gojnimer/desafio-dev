import { Container, Dot } from "./styles";

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "50%",
  },
  end: {
    y: "150%",
  },
};

const loadingCircleTransition = {
  repeat: Infinity,
  repeatType: 'reverse',
  ease: 'easeInOut',
  duration: 0.5
} as any;

export const Loader = () => {
  return (
    <Container
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
      layoutId="loader"
    >
      <Dot

        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <Dot

        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <Dot

        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </Container>
  );
};
