'use client';

import { useEffect, useState } from 'react';

import { type IconName } from './icons';
import SVG from 'react-inlinesvg';

export interface IconProps {
  className?: string;
  name: IconName;
  stroke?: string;
  fill?: string;
  width?: number;
  height?: number;
  opacity?: number;
  fillOpacity?: number;
}

export function Icon(props: IconProps) {
  const { name, ...rest } = props;
  const [iconSVG, setIconSVG] = useState<any>();

  useEffect(() => {
    void (async () => {
      try {
        const res = await import(`../../../public/assets/icons/${name}.svg`);
        setIconSVG(res?.default?.src);
      } catch (error) {
        //
      }
    })();
  }, [name]);

  if (!iconSVG) return null;

  return <SVG src={iconSVG} cacheRequests {...rest} />;
}

export default Icon;
