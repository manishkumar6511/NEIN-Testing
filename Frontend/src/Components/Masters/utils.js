import React from 'react';
import { Tree } from 'antd';

export const renderTreeNodes = data =>
  data.map(item =>  {
    const { children, title, key, ...restProps } = item; // Destructure key and title

    return children ? (
        <Tree.TreeNode title={title} key={key} dataRef={item} {...restProps}>
        {renderTreeNodes(children)}
      </Tree.TreeNode>
    ) : (
      <Tree.TreeNode title={title} key={key} dataRef={item} {...restProps} />
    );
  });

export const filterTree = (keys, halfKeys, rootNode) =>
  rootNode
    ? rootNode
        .filter(node => keys.includes(node.key) || halfKeys.includes(node.key))
        .map(nodeRoot => ({
          ...nodeRoot,
          children: filterTree(keys, halfKeys, nodeRoot.children)
        }))
    : [];
