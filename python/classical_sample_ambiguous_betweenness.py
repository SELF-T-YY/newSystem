#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/10/30 10:02
# @Author  : SELF-T-YY
# @Site    : 
# @File    : classical_sample_ambiguous_betweenness.py
# @Software: PyCharm

import json
import networkx as nx
import sys
import numpy


fileWritePath = r'../data_forSystem/ieee_visC/IV_ambiguousBetweennessData.json'
fileOriDataPath = r'../data_forSystem/ieee_visC/IV_id_x_y_kde_edges_betweenness.json'
sampleNameList = ['ISRW', 'TIES', 'SRW', 'RES', 'RJ', 'RNS']
sampleRateList = ['5', '10', '15', '20', '25', '30', '35', '40']

with open(fileOriDataPath) as f:
    oriData = json.load(f)
    oriBetweennessData = {}
    for _ in oriData:
        oriBetweennessData[_] = oriData[_]['betweenness']

    ambiguousData = {}
    for sampleName in sampleNameList:
        tempAmbiguousData_addName_addRate = {}
        for rate in sampleRateList:
            filePath = r'../data_forSystem/ieee_visC/forceData/IV_forceData_' + sampleName + '_rate_' + rate + '.json'
            sampleRate = 'rate-' + rate
            with open(filePath) as f1:
                sampleData = json.load(f1)
                tempEdgesList = sampleData['edges']
                edgesList = [[_['source'], _['target']] for _ in tempEdgesList]

                G = nx.Graph()
                G.add_edges_from(edgesList)
                betweennessData = nx.betweenness_centrality(G)

                # 取e的幂次方
                betweennessData = {_: numpy.exp(betweennessData[_]) for _ in betweennessData}

                # 计算歧义
                tempAmbiguousData = {_: numpy.exp(oriBetweennessData[_] - betweennessData[_]) for _ in betweennessData
                                     if _ in oriBetweennessData}

                # 归一化
                maxVal = 0
                minVal = 100000
                for _ in tempAmbiguousData:
                    maxVal = max(maxVal, tempAmbiguousData[_])
                    minVal = min(minVal, tempAmbiguousData[_])

                tempAmbiguousData = {_: (tempAmbiguousData[_] - minVal) / (maxVal - minVal) for _ in tempAmbiguousData}

                tempAmbiguousData_addName_addRate[sampleRate] = tempAmbiguousData
            ambiguousData[sampleName] = tempAmbiguousData_addName_addRate


fw = open(fileWritePath, 'w+')
fw.write(json.dumps(ambiguousData))
fw.close()
