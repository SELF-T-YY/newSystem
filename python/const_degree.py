#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/10/10 19:45
# @Author  : SELF-T-YY
# @Site    : 
# @File    : const_degree.py
# @Software: PyCharm


import json
import networkx as nx


filePath = '../data/cit-HepTh/CH.csv'
fileWritePath = '../data/cit-HepTh/CH_degree.json'
with open(filePath) as f:
    G = nx.Graph()
    while True:
        line = f.readline()
        if not line:
            break
        edges = line.replace('\n', '').split(',')
        G.add_edge(edges[0], edges[1])
    degree = G.degree()

    ansData = {}
    for _ in degree:
        (e, d) = _
        ansData[e] = d

    fw = open(fileWritePath, 'w+')
    fw.write(json.dumps(ansData))
    fw.close()