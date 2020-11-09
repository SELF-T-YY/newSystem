#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/11/9 0:05
# @Author  : SELF-T-YY
# @Site    : 
# @File    : classical_sample_ambiguous_shortestPath.py
# @Software: PyCharm

import json
import networkx as nx
import sys
import numpy


fileWritePath = r'../data_forSystem/ieee_visC/IV_ambiguousBetweennessData.json'
fileOriDataPath = r'../data_forSystem/ieee_visC/IVxy.json'
sampleNameList = ['ISRW', 'TIES', 'SRW', 'RES', 'RJ', 'RNS']
sampleRateList = ['5', '10', '15', '20', '25', '30', '35', '40']

with open(fileOriDataPath) as f:
    oriData = json.load(f)
    tempEdgesList = oriData['edges']
    edgesList = [[_['source'], _['target']] for _ in tempEdgesList]
    tempNodesList = oriData['nodes']
    nodesList = [_['id'] for _ in tempNodesList]

    G = nx.Graph()
    G.add_edges_from(edgesList)
    oriShortestPathData = {}
    # 计算原始数据的平均最短路径
    for node in nodesList:
        length = dict(nx.single_target_shortest_path_length(G, node))
        sum = 0
        for _ in length:
            sum += length[_]
        oriShortestPathData[node] = sum / len(length)

    ambiguousData = {}
    for sampleName in sampleNameList:
        tempAmbiguousData_addName_addRate = {}
        for rate in sampleRateList:
            filePath = r'../data_forSystem/ieee_visC/forceData/IV_forceData_' + sampleName + '_rate_' + rate + '.json'
            print(filePath)
            sampleRate = 'rate-' + rate
            with open(filePath) as f1:
                sampleData = json.load(f1)
                tempEdgesList = sampleData['edges']
                edgesList = [[_['source'], _['target']] for _ in tempEdgesList]

                tempNodesList = sampleData['nodes']
                nodesList = [_['id'] for _ in tempNodesList]

                G = nx.Graph()
                G.add_edges_from(edgesList)
                shortestPath = {}
                for node in nodesList:
                    if not G.has_node(node):
                        continue
                    length = dict(nx.single_target_shortest_path_length(G, node))
                    sum = 0
                    for _ in length:
                        sum += length[_]
                    shortestPath[node] = sum/len(length)

                # 计算歧义
                tempAmbiguousData = {_: oriShortestPathData[_] - shortestPath[_] for _ in
                                     shortestPath
                                     if _ in oriShortestPathData}

                # 归一化
                maxVal = 0
                minVal = 100000000
                for _ in tempAmbiguousData:
                    maxVal = max(maxVal, tempAmbiguousData[_])
                    minVal = min(minVal, tempAmbiguousData[_])

                tempAmbiguousData = {_: (tempAmbiguousData[_] - minVal) / (maxVal - minVal) for _ in tempAmbiguousData}

                tempAmbiguousData_addName_addRate[sampleRate] = tempAmbiguousData
            ambiguousData[sampleName] = tempAmbiguousData_addName_addRate


fw = open(fileWritePath, 'w+')
fw.write(json.dumps(ambiguousData))
fw.close()