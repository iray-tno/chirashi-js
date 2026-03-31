'use client';

import { DiscussionEmbed } from 'disqus-react';

interface Props {
  identifier: string;
  url: string;
  title: string;
}

export function DisqusComments({ identifier, url, title }: Props) {
  return (
    <DiscussionEmbed
      shortname="chiranoura"
      config={{ identifier, url, title }}
    />
  );
}
