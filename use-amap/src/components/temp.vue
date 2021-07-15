<template>
  <OneTable :table-columns="tableColumns" :module-name="moduleName" />
</template>

<script>
export default {
  name: 'HistoricalTrack',
  data() {
    return {
      tableColumns: [
        {
          prop: 'phoneNumber',
          label: '手机号',
          align: 'center'
        },
        {
          prop: 'carPlate',
          label: '车牌号',
          align: 'center'
        },
        {
          prop: 'deviceId',
          label: '设备IMEI码',
          align: 'center'
        },
        {
          prop: 'startTime',
          label: '起时间段',
          align: 'center'
        },
        {
          prop: 'endTime',
          label: '止时间段',
          align: 'center'
        },
        {
          prop: 'beginPoint',
          label: '起点',
          align: 'center',
          tooltip: true
        },
        {
          prop: 'endPoint',
          label: '终点',
          align: 'center',
          tooltip: true
        },
        {
          prop: 'miles',
          label: '驾驶里程',
          align: 'center'
        },
        {
          prop: 'driveDuration',
          label: '驾驶时长',
          align: 'center'
        },
        {
          prop: 'averageSpeed',
          label: '平均速度',
          align: 'center'
        },
        {
          prop: 'highestSpeed',
          label: '最大速度',
          align: 'center'
        },
        {
          prop: '',
          label: '详情',
          align: 'center'
        }
      ],
      moduleName: 'historicalTrack'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
