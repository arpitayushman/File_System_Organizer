#include<bits/stdc++.h>
using namespace std;
#define ll long long int
int gcd(ll a, ll b)
{
    if (b == 0)
        return a;
    return gcd(b, a % b);
     
}
int main(){
    ll t;
    cin>>t;
    while(t!=0){
        t--;
        ll x,y;
        cin>>x>>y;
        if(gcd(x,y)>1){
            cout<<"0"<<endl;
        }
        else if(gcd(x+1,y)>1){
            cout<<"1"<<endl;
        }
        else if(gcd(x,y+1)>1){
            cout<<"1"<<endl;
        }
        else{
            cout<<"2"<<endl;
        }
    }
}