/**
 * User: spurcell
 * Date: 1/16/13
 * Time: 3:20 PM
 */

var CWClient = require('./index').AmazonCloudwatchClient;

process.env['AWS_ACCESS_KEY_ID'] = 'mykey';
process.env['AWS_SECRET_ACCESS_KEY'] = 'monkeys';

exports["queryBuilder"] = {

    "encodes apostrophes": function (test) {

        var client = new CWClient();

        var result = client.queryBuilder('GetMetricStatistics', {
            Namespace: 'testing',
            MetricName: 'volume',
            Period: 300,
            'Statistics.member.1': 'Sum',
            StartTime: '2013-01-15T20:29:02.904Z',
            EndTime: '2013-01-16T20:29:02.904Z',
            'Dimensions.member.1.Name': 'PartnerName',
            'Dimensions.member.1.Value': "TJ's Sporting Goods",
            AWSAccessKeyId: 'mykey',
            Action: 'GetMetricStatistics',
            SignatureMethod: 'HmacSHA256',
            Timestamp: '2013-01-16T20:29:00Z',
            SignatureVersion: 2,
            Version: '2010-08-01'
        });

        test.deepEqual(result, [
            'AWSAccessKeyId=mykey',
            'Action=GetMetricStatistics',
            'Dimensions.member.1.Name=PartnerName',
            'Dimensions.member.1.Value=TJ%27s%20Sporting%20Goods',
            'EndTime=2013-01-16T20%3A29%3A02.904Z',
            'MetricName=volume',
            'Namespace=testing',
            'Period=300',
            'SignatureMethod=HmacSHA256',
            'SignatureVersion=2',
            'StartTime=2013-01-15T20%3A29%3A02.904Z',
            'Statistics.member.1=Sum',
            'Timestamp=2013-01-16T20%3A29%3A00Z',
            'Version=2010-08-01',
            'Signature=rHBtrSaGHRPpqE%2B3a8h%2BDcdRQrimLWtzGakZnNzOmeo%3D'
        ]);

        test.done();
    }
}