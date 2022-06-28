package com.example.sms_redirect;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import android.telephony.SmsMessage;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ReceiveSms extends BroadcastReceiver {
    private final OkHttpClient client = new OkHttpClient();
    public static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent.getAction().equals("android.provider.Telephony.SMS_RECEIVED")) {
            Bundle bundle = intent.getExtras();
            SmsMessage[] msgs;
            String msg_from;
            if (bundle != null) {
                try {
                    Object[] pdus = (Object[]) bundle.get("pdus");
                    msgs = new SmsMessage[pdus.length];
                    for (int i = 0; i < msgs.length; i++) {
                        msgs[i] = SmsMessage.createFromPdu((byte[]) pdus[i]);
                        msg_from = msgs[i].getOriginatingAddress();
                        String msgBody = msgs[i].getMessageBody();
                        String text = "From: " + msg_from + ", Body: " + msgBody;

                        Toast.makeText(context, text, Toast.LENGTH_SHORT).show();

                        JSONObject jo = new JSONObject();
                        Log.d("OKHTTP3", "create json");
                        try {
                            jo.put("message", text);
                            jo.put("password", "supersecretsmspassword");
                        } catch (JSONException e) {
                            Log.d("OKHTTP3", "json error");
                            e.printStackTrace();
                        }
                        RequestBody body = RequestBody.create(jo.toString(), JSON);
                        Log.d("OKHTTP3", "body created");
                        Request request = new Request.Builder()
                                .url("https://martelka23.ru/backend")
                                .post(body)
                                .build();
                        Log.d("OKHTTP3", "request created");
                        client.newCall(request).enqueue(new Callback() {
                            @Override
                            public void onFailure(@NonNull Call call, @NonNull IOException e) {
                                Log.d("OKHTTP3", "request error");
                                e.printStackTrace();
                            }

                            @Override
                            public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
                                Log.d("OKHTTP3", "request done");
                            }
                        });
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
