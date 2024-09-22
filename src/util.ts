'use strict';

import * as fs from 'fs';
import * as crypto from 'crypto';

export function getComposerObj(filePath: string) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  }
  return null;
}

export function getContentHash(content: any) {
  const relevantKeys = [
      'name',
      'version',
      'require',
      'require-dev',
      'conflict',
      'replace',
      'provide',
      'minimum-stability',
      'prefer-stable',
      'repositories',
      'extra',
  ];

  let relevantContent = {} as any;

  for (let key of relevantKeys.filter(key => key in content)) {
      relevantContent[key] = content[key];
  }

  if ('config' in content && 'platform' in content.config) {
      relevantContent.config = { platform: content.config.platform };
  }

  relevantContent = sortObjectKeys(relevantContent);
  // console.log(JSON.stringify(relevantContent));
  // process.exit(0);
  return md5(JSON.stringify(relevantContent));
}

function sortObjectKeys(obj: any) {
  const sorted = {} as any;
  Object.keys(obj).sort().forEach(key => {
      sorted[key] = obj[key];
  });
  return sorted;
}

export function md5(input: string) {
  input = input.replace(/\//g, "\\/");
  return crypto.createHash('md5').update(input, 'utf-8').digest('hex');
}
