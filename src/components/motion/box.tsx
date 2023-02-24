import { chakra } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { HTMLChakraProps } from '@chakra-ui/react';
import type { HTMLMotionProps } from 'framer-motion';
import type { FC } from 'react';
import type { Merge } from '@/types/merge';

type MotionBoxProps = Merge<HTMLChakraProps<'div'>, HTMLMotionProps<'div'>>

export const Box: FC<MotionBoxProps> = motion(chakra.div);
